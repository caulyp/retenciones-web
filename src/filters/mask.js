import masker from 'vue-the-mask/src/masker.js';
import tokens from 'vue-the-mask/src/tokens';

/*
 * Uso: 
 * {{ '79168166974' | mask('+7 (###) ###-##-##') }}
 */
export function mask(value, mask) {
  return masker(value, mask, true, tokens);
}

export function maskAccount(value) {
  if (!value) {
    return mask('', '#');
  }
  
  let format = '#';
  switch (value.length) {    
    case 1: {
      format = '#';
      break;
    }        
    case 2: {
      format = '#.#';
      break;
    }
    case 4: {
      format = '#.#.##';
      break;
    }
    case 6: {
      format = '#.#.##.##';
      break;
    }        
    case 8: {
      format = '#.#.##.##.##';
      break;
    }
    case 11: {
      format = '#.#.##.##.##.###';
      break;
    }    
  }
  return mask(value, format);
}