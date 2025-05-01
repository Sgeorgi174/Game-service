import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class CorsConfig {
  private readonly CLIENT_URL: string;
  constructor(private readonly configService: ConfigService) {
    this.CLIENT_URL = configService.getOrThrow<string>('CLIENT_URL');
  }

  corsConfig(app: INestApplication<any>) {
    app.enableCors({
      origin: this.CLIENT_URL,
      redentials: true,
    });
  }
}
