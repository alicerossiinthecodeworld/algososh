import cypress from 'cypress';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { ElementStates } from '../../src/types/element-states';
import { reverseStringSteps } from '../../src/components/string/utils';

const colorMap = new Map();
colorMap.set(ElementStates.Default, 'border: 4px solid  #0032ff')
colorMap.set(ElementStates.Changing, 'border: 4px solid #d252e1')
colorMap.set(ElementStates.Modified, 'border: 4px solid #7fe051')

const visitString = () => {
  cy.visit('/recursion');
};

describe('Строка работает', () => {
  it('если в инпуте пусто, кнопка добавления недоступна', () => {
    visitString();
    cy.get(`[data-cy="string_input"]`).clear();
    cy.get(`[data-cy="string_button"]`).should('be.disabled');
  });

  it('строка разворачивается корректно с проверкой каждого шага анимации', () => {
    visitString();
    const testString = 'Привет';
    cy.get(`[data-cy="string_input"]`).type(testString);

    const steps = reverseStringSteps(testString);
    cy.get(`[data-cy="string_button"]`).click();

    for (let step = 0; step < steps.length-1; step++) {
      for (let letterIndex = 0; letterIndex < steps[step].length-1; letterIndex++) {
        const letter = steps[step][letterIndex];
        const letterElement = cy.get(`[data-cy="letters"]`).children().eq(letterIndex);
        letterElement.should('have.text', letter.letter).should('have.css', 'border', colorMap.get(letter.state))
      }
      cy.wait(SHORT_DELAY_IN_MS-100)
    }
  })
});
