import chainlit as cl
from time import sleep


@cl.on_message
async def main(message: cl.Message):
    
    token_list = message.content.split()  
    
    msg = cl.Message(content="")
    for token in token_list:
        await msg.stream_token(token + " ")  
        await cl.sleep(0.3)  
    await msg.send()
