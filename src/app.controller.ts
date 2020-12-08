import { Get, Controller, Param, Res, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world ! 🦄' };
  }

  @Get('static/img/:imageName')
  image(@Param('imageName') imageName, @Res() res) {
    return res.sendFile(`img/${imageName}`, { root: 'static' });
  }
}
