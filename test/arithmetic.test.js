const chai = require('chai');
const { expect } = chai;
chai.should();
const Mtrx = require('mtrx');

const plain = m => [...m];

describe('add', function () {
  let A, B, C;

  beforeEach(function () {
    A = new Mtrx([[1, 2], [3, 4]]);
    B = new Mtrx([[5, 6], [7, 8]]);
    C = new Mtrx([[-1, 0], [2, -3]]);
  });

  describe('add: A + B', function () {
    it('додає поелементно', function () {
      plain(A.add(B)).should.deep.equal([[6, 8], [10, 12]]);
    });

    it('статичний Mtrx.add приймає звичайні масиви і повертає Mtrx', function () {
      const r = Mtrx.add([[1, 2]], [[3, 4]]);
      r.should.be.an.instanceof(Mtrx);
      plain(r).should.deep.equal([[4, 6]]);
    });

    it('повертає нову матрицю і не змінює операнди', function () {
      const r = A.add(B);
      r.should.not.equal(A);
      plain(A).should.deep.equal([[1, 2], [3, 4]]);
      plain(B).should.deep.equal([[5, 6], [7, 8]]);
    });

    context('властивості', function () {
      it('комутативність: A + B = B + A', function () {
        expect(Mtrx.equalAll(A.add(B), B.add(A))).to.be.true;
      });

      it('асоціативність: (A + B) + C = A + (B + C)', function () {
        expect(Mtrx.equalAll(A.add(B).add(C), A.add(B.add(C)))).to.be.true;
      });

      it('нейтральний елемент: A + 0 = A', function () {
        expect(Mtrx.equalAll(A.add(Mtrx.zeros(2)), A)).to.be.true;
      });
    });

    context('граничні випадки', function () {
      it('матриця 1x1', function () {
        plain(Mtrx.add([[2]], [[3]])).should.deep.equal([[5]]);
      });

      it('прямокутні матриці 2x3', function () {
        plain(Mtrx.add([[1, 2, 3], [4, 5, 6]], [[1, 1, 1], [1, 1, 1]]))
          .should.deep.equal([[2, 3, 4], [5, 6, 7]]);
      });

      it('дробові числа', function () {
        expect(Mtrx.add([[0.1]], [[0.2]])[0][0]).to.be.closeTo(0.3, 1e-12);
      });

      it('NaN поширюється на результат', function () {
        expect(Mtrx.add([[NaN]], [[1]])[0][0]).to.be.NaN;
      });
    });

    context('некоректні аргументи', function () {
      const bad = [
        ['різні розміри', [[1, 2, 3]]],
        ['число', 5],
        ['рядок', 'ab'],
        ['null', null],
        ['undefined', undefined],
        ['рвана матриця', [[1, 2], [3]]],
        ['нечислові елементи', [['a', 'b'], ['c', 'd']]],
      ];

      bad.forEach(([name, arg]) => {
        it(`TypeError: ${name}`, function () {
          expect(() => A.add(arg)).to.throw(TypeError);
        });
      });
    });
  });
});
