<?php

namespace Drupal\recetify_content\ThemeDto\ComponentBlock;

use Drupal\recetify_content\ThemeDto\Component\ButtonDto;
use Drupal\recetify_content\ThemeDto\Component\ImageDto;
use Drupal\recetify_content\ThemeDto\ThemeDto;

class FooterDto extends ThemeDto {

  public const TYPE = 'component-blocks/footer';

  public array $icons = [];
  public ?ImageDto $logo = NULL;
  public array $menu = [];

}
