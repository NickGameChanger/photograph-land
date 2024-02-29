from typing import Any
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import telegram

from django.core.serializers.json import DjangoJSONEncoder
import telegram


BOT_TOKEN = '6519972699:AAGaXEUZ8VamvNa1Ynsr-2ILxfgKI8D6ePY'
BOT_URL = 'https://api.teelgram.org/bot%s/'%BOT_TOKEN
BOT_CHAT_ID = 629958561

# class LazyEncoder(DjangoJSONEncoder):
#     def default(self, obj: Any) -> Any:
#         if isinstance(obj, dict):
#             return str(obj)
#         return super().default(obj)

def bot(message: str, chat_id: int=BOT_CHAT_ID, token: str = BOT_TOKEN) -> None:
    -
    bot = telegram.Bot(token=token)
    print(bot.send_message(chat_id=chat_id, text=message, parse_mode=telegram.ParseMode.HTML))


@api_view(['POST'])
def send_request(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    is_wedding = data.get('isWedding')
    is_love_story = data.get('isLoveStory')
    is_family = data.get('isFamily')

    message = (
        f'📸Новая заявка на фотосессию от <b>{name}</b> \n'
        f'email: {email}\n'
        f'идеи клиента: {message}\n'
        f'Клиент выразил желание к: \n'
    )
    if is_wedding:
        message += '🤵👰🏻Wedding session\n'
    if is_love_story:
        message += '👩‍❤️‍👨Love story\n'
    if is_family:
        message += '👨‍👩‍👦‍👦Family vibe'
    bot(message)
    if True:
        return Response(status=status.HTTP_201_CREATED)
