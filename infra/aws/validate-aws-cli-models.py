import json
import subprocess
from pathlib import Path
BASE=Path(__file__).parent

def skeleton(*args):
    p=subprocess.run(['aws',*args,'--generate-cli-skeleton','input'],text=True,capture_output=True,check=True)
    return json.loads(p.stdout)

def check(actual, shape, path='root'):
    errors=[]
    if isinstance(actual,dict):
        if not isinstance(shape,dict): return [f'{path}: expected object']
        for key,value in actual.items():
            if key not in shape:
                errors.append(f'{path}.{key}: not in model')
            else:
                errors += check(value,shape[key],f'{path}.{key}')
    elif isinstance(actual,list):
        if not isinstance(shape,list) or not shape: return [f'{path}: model has no list shape']
        sample=shape[0]
        for i,value in enumerate(actual): errors += check(value,sample,f'{path}[{i}]')
    elif actual is not None and shape is not None and isinstance(actual,(str,int,float,bool)) and isinstance(shape,(str,int,float,bool)):
        if type(actual) is not type(shape) and not (isinstance(actual,int) and not isinstance(actual,bool) and isinstance(shape,float)):
            errors.append(f'{path}: value type {type(actual).__name__}, model {type(shape).__name__}')
    return errors

checks=[]
cf=skeleton('cloudfront','update-distribution')
cfshape=cf['DistributionConfig']
fragment=json.loads((BASE/'cloudfront-patch-fragments.json').read_text())
checks += check(fragment['originToAdd'],cfshape['Origins']['Items'][0],'Origin')
checks += check(fragment['defaultCacheBehaviorFragment'],cfshape['DefaultCacheBehavior'],'DefaultCacheBehavior')
checks += check(fragment['customErrorResponses'],cfshape['CustomErrorResponses'],'CustomErrorResponses')
oac=skeleton('cloudfront','create-origin-access-control')['OriginAccessControlConfig']
checks += check(json.loads((BASE/'oac-config.json').read_text(),),oac,'OAC')
rhp=skeleton('cloudfront','create-response-headers-policy')['ResponseHeadersPolicyConfig']
for name in ('response-headers-policy-report-only.json','response-headers-policy-enforcing-template.json'):
    checks += check(json.loads((BASE/name).read_text()),rhp,name)
s3lc=skeleton('s3api','put-bucket-lifecycle-configuration')['LifecycleConfiguration']
life=json.loads((BASE/'lifecycle-noncurrent-30d-3.json').read_text())
checks += check(life,s3lc,'LifecycleConfiguration')
pab=skeleton('s3api','put-public-access-block')['PublicAccessBlockConfiguration']
checks += check(json.loads((BASE/'public-access-block-final.json').read_text()),pab,'PublicAccessBlockConfiguration')
for name in ('bucket-policy-temporary.json','bucket-policy-final.json'):
    json.loads((BASE/name).read_text())
if checks:
    print('\n'.join(checks)); raise SystemExit(1)
print('AWS CLI model shape checks passed: CloudFront origin, default behavior, custom errors, OAC, two RHPs, S3 lifecycle, PAB, and both bucket-policy JSON documents.')
