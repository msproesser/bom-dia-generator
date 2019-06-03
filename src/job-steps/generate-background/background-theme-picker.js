import { randomInt } from '../../utils';

const themes = {}
themes['default'] = ['default']
themes['bom-dia'] = ['pixabay.sunrise']
themes['boa-tarde'] = ['pixabay.sunset']
themes['boa-noite'] = ['pixabay.night']
themes['ninja'] = ['pixabay.naruto']

import filterPicker from './background-filter-picker';
export default async function(theme) {
  const choosenTheme = themes[theme] || themes['default'];
  const choosenFilter = choosenTheme[randomInt(choosenTheme.length)];
  return filterPicker(choosenFilter);
}