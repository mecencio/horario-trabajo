const { convertirEnHora, convertirEnInt } = require('../js/funciones');

test('convertirEnHora convierte 450 en "07:30"', () => {
    expect(convertirEnHora(450)).toBe('07:30');
});

test('convertirEnHora convierte 930 en "15:30"', () => {
    expect(convertirEnHora(930)).toBe('15:30');
});

test('convertirEnInt convierte "07:30" en 450', () => {
    expect(convertirEnInt('07:30')).toBe(450);
});

test('convertirEnInt convierte "15:30" en 930', () => {
    expect(convertirEnInt('15:30')).toBe(930);
});
