import os
import boto3
import json
from typing import List, Dict
from dataclasses import dataclass, asdict
import logging

LANGUAGES = ['es', 'en', 'de']

logger = logging.getLogger()

@dataclass
class TranslationString:
    es: str
    en: str
    de: str

@dataclass
class SculptureData:
    sculpture_id: str
    image: str
    title: TranslationString
    description: TranslationString
    excerpt: TranslationString
    is_starred: bool

class SculptureDatabase:
    def __init__(self):
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION')
        )
        self.bucket_name = os.getenv('S3_BUCKET_NAME')
        self.trans = dict()

    def upload_sculpture(self, sculpture_data: SculptureData):
        if sculpture_data.image:
            # Upload image to S3
            with open(sculpture_data.image, 'rb') as image_file:
                self.s3.upload_fileobj(image_file, self.bucket_name, f'sculptures/{sculpture_data.sculpture_id}/image.jpg')

        # Create sculpture metadata
        metadata = {
            'title': asdict(sculpture_data.title),
            'description': asdict(sculpture_data.description),
            'excerpt': asdict(sculpture_data.excerpt),
            'is_starred': sculpture_data.is_starred
        }
        # Upload metadata to S3
        self.s3.put_object(
            Bucket=self.bucket_name,
            Key=f'sculptures/{sculpture_data.sculpture_id}/metadata.json',
            Body=json.dumps(metadata),
            ContentType='application/json'
        )

    def get_sculpture(self, sculpture_id: str, force_update=False) -> SculptureData:
        image_url = f"https://{self.bucket_name}.s3.amazonaws.com/sculptures/{sculpture_id}/image.jpg"

        # Get metadata
        metadata_response = self.s3.get_object(Bucket=self.bucket_name, Key=f'sculptures/{sculpture_id}/metadata.json')
        metadata = json.loads(metadata_response['Body'].read().decode('utf-8'))
        r = SculptureData(**{
            'sculpture_id': sculpture_id,
            'image': image_url,
            'title': metadata.get('title', TranslationString),
            'description': metadata.get('description', TranslationString),
            'excerpt': metadata.get('excerpt', TranslationString),
            'is_starred': metadata.get('is_starred', False)
        })
        return r

    def list_sculptures(self) -> List[Dict]:
        # List all sculptures
        response = self.s3.list_objects_v2(Bucket=self.bucket_name, Prefix='sculptures/')
        sculptures = []
        for item in response.get('Contents', []):
            if item['Key'].endswith('/metadata.json'):
                sculpture_id = item['Key'].split('/')[1]
                sculptures.append(self.get_sculpture(sculpture_id).__dict__)
        return sculptures

    def delete_sculpture(self, sculpture_id: str):
        # Delete image from S3
        self.s3.delete_object(Bucket=self.bucket_name, Key=f'sculptures/{sculpture_id}/image.jpg')
        
        # Delete metadata from S3
        self.s3.delete_object(Bucket=self.bucket_name, Key=f'sculptures/{sculpture_id}/metadata.json')
