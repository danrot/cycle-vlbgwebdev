import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver, input, div, label } from '@cycle/dom';

function main(sources) {
    const sliderValue1$ = sources.DOM.select('.slider-1').events('change')
        .map(ev => ev.target.value)
        .map(value => parseInt(value))
        .startWith(50);

    const sliderValue2$ = sources.DOM.select('.slider-2').events('change')
        .map(ev => ev.target.value)
        .map(value => parseInt(value))
        .startWith(50);

    return {
        DOM: xs.combine(sliderValue1$, sliderValue2$).map(([value1, value2]) => 
            div([
                div([
                    input('.slider-1', {attrs: { type: 'range'}}),
                    label(value1)
                ]),
                div([
                    input('.slider-2', {attrs: { type: 'range'}}),
                    label(value2)
                ]),
                div('Sum: ' + (value1 + value2))
            ])
        )
    };
}

run(main, {
    DOM: makeDOMDriver('#app')
});

