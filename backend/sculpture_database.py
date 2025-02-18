import os
import boto3
import json
from typing import List, Dict

class SculptureDatabase:
    def __init__(self):
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION')
        )
        self.bucket_name = os.getenv('S3_BUCKET_NAME')

    def upload_sculpture(self, sculpture_id: str, 
                         image_path: str, 
                         title: str, description: str):
        
        if(image_path):
            # Upload image to S3
            with open(image_path, 'rb') as image_file:
                self.s3.upload_fileobj(image_file, self.bucket_name, f'sculptures/{sculpture_id}/image.jpg')

        # Create sculpture metadata
        metadata = {
            'title': title,
            'description': description
        }
        # Upload metadata to S3
        self.s3.put_object(
            Bucket=self.bucket_name,
            Key=f'sculptures/{sculpture_id}/metadata.json',
            Body=json.dumps(metadata),
            ContentType='application/json'
        )

    def get_sculpture(self, sculpture_id: str) -> Dict:
        # Get image URL
        image_url = self.s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': self.bucket_name, 'Key': f'sculptures/{sculpture_id}/image.jpg'},
            ExpiresIn=3600
        )

        # Get metadata
        metadata_response = self.s3.get_object(Bucket=self.bucket_name, Key=f'sculptures/{sculpture_id}/metadata.json')
        metadata = json.loads(metadata_response['Body'].read().decode('utf-8'))

        return {
            'sculptureId': sculpture_id,
            'image': image_url,
            'title': metadata['title'],
            'description': metadata['description'],
        }

    def list_sculptures(self) -> List[Dict]:
        # List all sculptures
        response = self.s3.list_objects_v2(Bucket=self.bucket_name, Prefix='sculptures/')
        sculptures = []
        for item in response.get('Contents', []):
            if item['Key'].endswith('/metadata.json'):
                sculpture_id = item['Key'].split('/')[1]
                sculptures.append(self.get_sculpture(sculpture_id))
        return sculptures

    def delete_sculpture(self, sculpture_id: str):
        # Delete image from S3
        self.s3.delete_object(Bucket=self.bucket_name, Key=f'sculptures/{sculpture_id}/image.jpg')
        
        # Delete metadata from S3
        self.s3.delete_object(Bucket=self.bucket_name, Key=f'sculptures/{sculpture_id}/metadata.json')
