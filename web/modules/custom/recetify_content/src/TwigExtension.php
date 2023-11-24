<?php

namespace Drupal\recetify_content;

use Drupal\Component\Render\MarkupInterface;
use Drupal\Core\Render\Markup;
use Twig\TwigFilter;

class TwigExtension extends \Drupal\Core\Template\TwigExtension {

  /**
   * Gets a unique identifier for this Twig extension.
   *
   * @return string
   *   A unique identifier for this Twig extension.
   */
  public function getName() {
    return 'recetify_content_twig_extension';
  }

  /**
   * Generates a list of all Twig filters that this extension defines.
   *
   * @return array
   *   A key/value array that defines custom Twig filters. The key denotes the
   *   filter name used in the tag, e.g.:
   *   @code
   *   {{ foo|testfilter }}
   *   @endcode
   *
   *   The value is a standard PHP callback that defines what the filter does.
   */
  public function getFilters() {
    return [
      new TwigFilter('render_dto', [$this, 'renderDto']),
    ];
  }

  /**
   * @param array|null $input
   *
   * @return \Drupal\Component\Render\MarkupInterface|null
   */
  public function renderDto(?array $input = NULL): ?MarkupInterface {

    if (NULL === $input) {
      return NULL;
    }

    /** @var \Drupal\components\Template\ComponentsRegistry $componentsRegistry */
    $componentsRegistry = \Drupal::service('components.registry');

    [$namespace, $componentName] = explode('/', $input['type']);

    $template = $componentsRegistry->getTemplate(strtr('@{namespace}/{componentName}/{componentName}.twig', [
      '{namespace}' => $namespace,
      '{componentName}' => $componentName,
    ]));

    /** @var \Twig\Environment $twigService */
    $twigService = \Drupal::service('twig');

    return Markup::create($twigService->load($template)->render($input['data']));

  }

}
