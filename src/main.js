import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver, input, div, label } from '@cycle/dom';

function intent(domSource) {
    return {
        changeValue1$: domSource.select('.slider-1').events('change')
            .map(ev => ev.target.value)
            .map(value => parseInt(value)),
        changeValue2$: domSource.select('.slider-2').events('change')
            .map(ev => ev.target.value)
            .map(value => parseInt(value)),
    };
}

function model(actions) {
    const sliderValue1$ = actions.changeValue1$.startWith(50);
    const sliderValue2$ = actions.changeValue2$.startWith(50);

    const score$ = xs.combine(sliderValue1$, sliderValue2$).map(([value1, value2]) => value1 * value2);

    return xs.combine(sliderValue1$, sliderValue2$, score$);
}

function view(state$) {
    return state$.map(([value1, value2, score]) => 
        div([
            div([
                input('.slider-1', {attrs: { type: 'range'}}),
                label(value1)
            ]),
            div([
                input('.slider-2', {attrs: { type: 'range'}}),
                label(value2)
            ]),
            div('Sum: ' + (score))
        ])
    );
}

function main(sources) {
    const actions = intent(sources.DOM);
    const state$ = model(actions);
    const view$ = view(state$);

    return {
        DOM: view$
    };
}

run(main, {
    DOM: makeDOMDriver('#app')
});

