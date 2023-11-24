<?php

namespace Drupal\recetify_content\ThemeDto\Page;

use Drupal\recetify_content\ThemeDto\ComponentBlock\ParagraphHeroDto;

class HomePageDto extends PageDto {

  public const TYPE = 'pages/home';

  public ?ParagraphHeroDto $hero = NULL;

}
