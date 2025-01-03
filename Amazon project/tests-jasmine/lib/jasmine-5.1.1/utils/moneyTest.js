import {formatCurrency} from "../../../../script/utils/money.js"

describe('test suite: formatCurrency', () => {
  it('convert cents into dollars', ()=>{
    expect (formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', ()=>{
    expect (formatCurrency(0)).toEqual('0.00');
  });


  it('convert cents into dollars', ()=>{
    expect (formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds up to the nearest cent 2', () => {
    expect (formatCurrency(2000.4)).toEqual('20.00');
  })

  it('count negative numbers', () => {
    expect (formatCurrency(-105)).toEqual('-1.05');
  })
})

