<?php

namespace Drupal\recetify_content\ThemeDto\Page;

use Drupal\recetify_content\ThemeDto\ComponentBlock\FooterDto;
use Drupal\recetify_content\ThemeDto\ComponentBlock\HeaderDto;
use Drupal\recetify_content\ThemeDto\ThemeDto;

abstract class PageDto extends ThemeDto {
  public HeaderDto $header;
  public FooterDto $footer;
}
