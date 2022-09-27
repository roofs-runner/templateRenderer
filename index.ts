// Import stylesheets
import './style.css';

const pattern = /\{(.*?)}/;
const stringMessage = `This is an {error} {error2} text`;

const getErrorMessage = (defaultMessage: string, templateMessage: string) => {
  return (params) => { 
    const matchedParams = pattern.exec(templateMessage);
    console.log('marchedParams', matchedParams)
    console.log('params', params)
    return defaultMessage;
  }
}

const stringToEntitiesArray = (text: string, values: any) => {
  let match: RegExpExecArray;
  const parsedEntities: any[] = [];
  do {
      console.log('this is text+++++++++++++', text);
      match = pattern.exec(text);
      console.log('match top', match);
      if (match) {
          const [entityText, entity] = match;
          console.log('entityText', entityText);
          console.log('entity', entity);
          if (match.index) {
              console.log('match index exists', match.index)
              parsedEntities.push(text.substring(0, match.index));
              text = text.substring(match.index)
          }

          if (entity in values) {
            console.log('entity in values')
            parsedEntities.push(values[entity])
            text = text.substring(entityText.length);
          }

      } else {
          parsedEntities.push(text);
          text = null;
      }
  } while (text);
  console.log('parsedEntities', parsedEntities)
  return parsedEntities;
}

const execTemplate = (str, values) => {
  const parsed = stringToEntitiesArray(str, values);

  return parsed.join('');
}


console.log('stringToEntitiesArray->', execTemplate(
  stringMessage,
   { error: 'error1', error2: 'error2'}
   )
)



// Write TypeScript code!
let text = `empty`
text = getErrorMessage('default error', stringMessage);
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<pre>${text({ value1: ''})}</pre>`;