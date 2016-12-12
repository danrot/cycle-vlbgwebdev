import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver, input, div, label } from '@cycle/dom';

function main(sources) {
    const sliderValue$ = sources.DOM.select('.slider').events('change')
        .map(ev => ev.target.value)
        .startWith(50);

    return {
        DOM: sliderValue$.map(value => 
            div([
                input('.slider', {attrs: { type: 'range'}}),
                label(value)
            ])
        )
    };
}

run(main, {
    DOM: makeDOMDriver('#app')
});

