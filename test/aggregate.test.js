const { expect } = require('chai');
const Mtrx = require('mtrx');

describe('sum / min / max', function () {
  const m = new Mtrx([[1, -2, 3], [4, 5, -6]]);

  describe('sum', function () {
    it('sum() - сума всіх елементів', function () {
      expect(m.sum()).to.equal(5);
    });

    it('sum(0) - суми по рядках', function () {
      expect(m.sum(0)).to.deep.equal([2, 3]);
    });

    it('sum(1) - суми по стовпцях', function () {
      expect(m.sum(1)).to.deep.equal([5, 3, -3]);
    });

    it('сума сум по рядках = сума сум по стовпцях = sum()', function () {
      const total = m.sum();
      const add = (a, b) => a + b;
      expect(m.sum(0).reduce(add)).to.equal(total);
      expect(m.sum(1).reduce(add)).to.equal(total);
    });

    context('граничні випадки', function () {
      it('матриця 1x1', function () {
        const one = new Mtrx([[7]]);
        expect(one.sum()).to.equal(7);
        expect(one.sum(0)).to.deep.equal([7]);
        expect(one.sum(1)).to.deep.equal([7]);
      });

      it('один рядок', function () {
        const row = new Mtrx([[1, 2, 3]]);
        expect(row.sum(0)).to.deep.equal([6]);
        expect(row.sum(1)).to.deep.equal([1, 2, 3]);
      });

      it('один стовпець', function () {
        const col = new Mtrx([[1], [2], [3]]);
        expect(col.sum(0)).to.deep.equal([1, 2, 3]);
        expect(col.sum(1)).to.deep.equal([6]);
      });
    });
  });

  describe('min / max', function () {
    context('граничні випадки', function () {
      it('матриця 1x1: min = max = елемент', function () {
        const one = new Mtrx([[-3]]);
        expect(one.min()).to.equal(-3);
        expect(one.max()).to.equal(-3);
      });

      it('усі елементи однакові', function () {
        const same = Mtrx.ones(3);
        expect(same.min()).to.equal(1);
        expect(same.max()).to.equal(1);
        expect(same.min(0)).to.deep.equal([1, 1, 1]);
      });

      it('лише від\'ємні числа', function () {
        const neg = new Mtrx([[-5, -1], [-9, -3]]);
        expect(neg.max()).to.equal(-1);
        expect(neg.min()).to.equal(-9);
      });

      it('Infinity / -Infinity', function () {
        const inf = new Mtrx([[Infinity, 0], [-Infinity, 1]]);
        expect(inf.max()).to.equal(Infinity);
        expect(inf.min()).to.equal(-Infinity);
      });

      it('дуже близькі значення', function () {
        const eps = new Mtrx([[1, 1 + Number.EPSILON]]);
        expect(eps.max()).to.equal(1 + Number.EPSILON);
        expect(eps.min()).to.equal(1);
      });
    });
  });
});
