const { expect } = require('chai');
const Mtrx = require('mtrx');

describe('changeRows / changeCols', function () {
  let m;

  beforeEach(function () {
    m = new Mtrx([[1, 2, 3], [4, 5, 6]]);
  });

  describe('changeRows', function () {
    it('changeRows(+n) додає рядки з заданим значенням', function () {
      m.changeRows(1, 9);
      expect([...m]).to.deep.equal([[1, 2, 3], [4, 5, 6], [9, 9, 9]]);
    });

    it('за замовчуванням заповнює нулями', function () {
      m.changeRows(2);
      expect(m.rows).to.equal(4);
      expect(m[2]).to.deep.equal([0, 0, 0]);
      expect(m[3]).to.deep.equal([0, 0, 0]);
    });

    it('changeRows(-n) видаляє рядки з кінця', function () {
      m.changeRows(-1);
      expect([...m]).to.deep.equal([[1, 2, 3]]);
    });

    context('граничні випадки', function () {
      it('видалити всі рядки', function () {
        m.changeRows(-2);
        expect(m).to.have.lengthOf(0);
      });

      it('на матриці 1x1', function () {
        const one = new Mtrx([[5]]);
        one.changeRows(2, 1);
        expect([...one]).to.deep.equal([[5], [1], [1]]);
      });
    });

    context('дефект: немає перевірки аргументів', function () {
      it('видалення більше рядків, ніж є, проходить без помилки', function () {
        m.changeRows(-5);
        expect(m).to.have.lengthOf(0);
      });

      it('можна заповнити нечисловим значенням', function () {
        m.changeRows(1, 'x');
        expect(m[2]).to.deep.equal(['x', 'x', 'x']);
        expect(Mtrx.isMtrxLike(m)).to.be.false;
      });

      it('дробова кількість округлюється вгору', function () {
        m.changeRows(1.5);
        expect(m.rows).to.equal(4);
      });
    });
  });

  describe('changeCols', function () {
    it('changeCols(+n) додає стовпці з заданим значенням', function () {
      m.changeCols(2, 0);
      expect([...m]).to.deep.equal([[1, 2, 3, 0, 0], [4, 5, 6, 0, 0]]);
    });

    it('за замовчуванням заповнює нулями', function () {
      m.changeCols(1);
      expect(m.cols).to.equal(4);
      expect(m.sum(1)[3]).to.equal(0);
    });


    it('на матриці 1x1', function () {
      const one = new Mtrx([[5]]);
      one.changeCols(2, 1);
      expect([...one]).to.deep.equal([[5, 1, 1]]);
    });

    context('дефект: немає перевірки аргументів', function () {
      it('видалення всіх стовпців лишає порожні рядки', function () {
        m.changeCols(-3);
        expect([...m]).to.deep.equal([[], []]);
        expect(Mtrx.isMtrxLike(m)).to.be.false;
      });

      it('видалення більше стовпців, ніж є, проходить без помилки', function () {
        m.changeCols(-10);
        expect([...m]).to.deep.equal([[], []]);
      });
    });
  });

  describe('changeRows + changeCols разом', function () {
    it('розширення 2x3 -> 3x4', function () {
      m.changeRows(1, 7);
      m.changeCols(1, 0);
      expect([...m]).to.deep.equal([
        [1, 2, 3, 0],
        [4, 5, 6, 0],
        [7, 7, 7, 0],
      ]);
    });

    it('після зміни розміру з матрицею працює арифметика', function () {
      m.changeRows(1, 1);
      expect([...m.add(Mtrx.ones(3))]).to.deep.equal([[2, 3, 4], [5, 6, 7], [2, 2, 2]]);
    });
  });
});
