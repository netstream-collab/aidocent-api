import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('View')
@Controller('view')
export class ViewController {
  @Get('sample')
  @Render('page/sample')
  renderSamplePage() {
    return {};
  }
}
