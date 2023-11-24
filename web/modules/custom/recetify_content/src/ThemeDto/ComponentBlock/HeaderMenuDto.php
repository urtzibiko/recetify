<?php

namespace Drupal\recetify_content\ThemeDto\ComponentBlock;

use Drupal\recetify_content\ThemeDto\Component\ButtonDto;
use Drupal\recetify_content\ThemeDto\Component\ImageDto;
use Drupal\recetify_content\ThemeDto\ThemeDto;

class HeaderMenuDto extends ThemeDto {

  public const TYPE = 'component-blocks/header-menu';

  /**
   * @var HeaderMenuItem[]
   */
  public array $items;

}
