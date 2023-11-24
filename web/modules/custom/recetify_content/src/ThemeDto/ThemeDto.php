<?php

namespace Drupal\recetify_content\ThemeDto;

use ReflectionClass;
use ReflectionProperty;

/**
 * Represents a base DTO.
 */
abstract class ThemeDto implements \JsonSerializable {

  public const TYPE = NULL;

  /**
   * @return array
   */
  public function jsonSerialize(): array {

    $array = [
      'type' => static::TYPE,
      'data' => []
    ];

    $reflect = new ReflectionClass($this);
    $properties = $reflect->getProperties(ReflectionProperty::IS_PUBLIC);
    foreach ($properties as $property) {
      $array['data'][$property->getName()] = $property->getValue($this);
    }

    return $array;

  }

}
