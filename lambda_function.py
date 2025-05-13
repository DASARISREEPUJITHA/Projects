import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('DiaryEntries')

def lambda_handler(event, context):
    try:
        # Parse the request body
        body = json.loads(event['body'])

        # Extract content
        diary_text = body.get('diaryText')
        date_time = body.get('dateTime')

        if not diary_text or not date_time:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing diary text or date/time.'})
            }

        # Generate a unique ID for the entry
        entry_id = str(uuid.uuid4())

        # Save to DynamoDB
        table.put_item(Item={
            'entry_id': entry_id,
            'date_time': date_time,
            'content': diary_text
        })

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Diary entry saved successfully!', 'entry_id': entry_id})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal server error', 'error': str(e)})
        }
