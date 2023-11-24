<?php

namespace Drupal\recetify_content\ThemeDto\ComponentBlock;

use Drupal\Component\Render\MarkupInterface;
use Drupal\recetify_content\ThemeDto\Component\ButtonDto;
use Drupal\recetify_content\ThemeDto\Component\ImageDto;
use Drupal\recetify_content\ThemeDto\ThemeDto;

class ParagraphHeroDto extends ThemeDto {

  public const TYPE = 'component-blocks/paragraph-hero';

  public ?ImageDto $image = NULL;
  public ?string $teaser = NULL;
  public ?ButtonDto $button = NULL;

}
