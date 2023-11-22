<?php

namespace Drupal\recetify_content\ThemeDto\Component;

use Drupal\recetify_content\ThemeDto\ThemeDto;

class ButtonDto extends ThemeDto {

  public const TYPE = 'components/button';

  public string $text;
  public string $url;

}
