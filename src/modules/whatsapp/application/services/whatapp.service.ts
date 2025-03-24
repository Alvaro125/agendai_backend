import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import * as io from 'socket.io-client';
@Injectable()
export class EvolutionService implements OnModuleInit {
  private readonly logger = new Logger(EvolutionService.name);
  public memory: any[] = [
    {
      role: 'assistant',
      content: `olá Sou seu atendente da pizzaria
    Nosso menu:
1. Pizza Calabresa - Pequena: R$10, Média: R$15, Grande: R$20
2. Pizza Portuguesa - Pequena: R$15, Média: R$25, Grande: R$35`,
    },
  ];
  // private socket: any;

  onModuleInit() {
    this.connectToEvolution();
  }

  private connectToEvolution() {
    const openai = new OpenAI({
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      apiKey: process.env['APIKEY_AI'],
    });

    const socket = io('ws://localhost:8080/NOME DA INSTANCIA', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.logger.log('Conectado à Evolution API');
    });

    socket.on('messages.upsert', async (data: any) => {
      this.logger.log(`Mensagem recebida: ${JSON.stringify(data)}`);
      const regexGroup = /@g\.us/;
      if (
        !regexGroup.test(data.data.key.remoteJid) &&
        data.data.key.remoteJid == '556781011923@s.whatsapp.net'
      ) {
        console.log(`Mensagem recebida: ${JSON.stringify(data)}`);
        this.memory.push({
          role: 'user',
          content: [
            { type: 'text', text: `${data.data.message.conversation}` },
          ],
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = await openai.chat.completions.create({
          model: 'gemini-2.0-flash',
          messages: [
            {
              role: 'system',
              content:
                'Atendimento ao cliente de uma pizzaria sempre que o cliente pedir uma pizza retorne se aasim possivel o valor da pizza, e confirmação de entrega. ',
            },
            ...this.memory,
          ],
        });
        this.memory.push({
          role: 'assistant',
          content: response.choices[0].message.content,
        });
        console.log(response.choices[0].message.content);
        await fetch(
          'http://localhost:8080/message/sendText/NOME DA INSTANCIA',
          {
            method: 'POST',
            headers: {
              apikey: '53a084726da2555d',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              number: '556781011923',
              text: response.choices[0].message.content,
              delay: 2000,
            }),
          },
        );
      }
    });

    socket.on('disconnect', (reason) => {
      this.logger.warn(`Desconectado: ${reason}`);
    });

    socket.on('connect_error', (error) => {
      this.logger.error(`Erro na conexão: ${error.message}`);
    });
  }
}
