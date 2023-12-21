<?php

namespace Drupal\pizza_dough_calculator\Controller;

use Drupal\Core\Controller\ControllerBase;

class PizzaDoughCalculatorController extends ControllerBase {

  public function page(): array {

    return [
      '#theme' => 'pizza_dough_calculator',
      '#title' => 'Calculadora para masa de pizza'
    ];
  }
}
