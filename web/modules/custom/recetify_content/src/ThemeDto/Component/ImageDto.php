<?php

namespace Drupal\recetify_content\ThemeDto\Component;

use Drupal\Core\Url;
use Drupal\recetify_content\ThemeDto\ThemeDto;

class ImageDto extends ThemeDto {

  public const TYPE = 'components/image';

  public string $src;
  public string $alt;

}
