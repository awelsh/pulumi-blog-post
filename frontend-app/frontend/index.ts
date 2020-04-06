import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const env = pulumi.getStack().split('.')[1];

const siteBucket = new aws.s3.Bucket(
  `pulumi-blog-post-${env}`,
  {
    bucket: `pulumi-blog-post-${env}`,
    acl: "public-read",
    website: {
      indexDocument: "index.html",
      errorDocument: "index.html"
    }
  }, { deleteBeforeReplace: true }
);

function publicReadPolicyForBucket(bucketName: string) {
  return JSON.stringify({
      Version: "2012-10-17",
      Statement: [{
          Effect: "Allow",
          Principal: "*",
          Action: [
              "s3:GetObject"
          ],
          Resource: [
              `arn:aws:s3:::${bucketName}/*` // policy refers to bucket name explicitly
          ]
      }]
  });
}

// Set the access policy for the bucket so all objects are readable
const bucketPolicy = new aws.s3.BucketPolicy(
  "bucketPolicy", 
  {
    bucket: siteBucket.bucket,
    policy: siteBucket.bucket.apply(publicReadPolicyForBucket)
  }
);

export const bucketName = siteBucket.bucket;
export const websiteUrl = siteBucket.websiteEndpoint;