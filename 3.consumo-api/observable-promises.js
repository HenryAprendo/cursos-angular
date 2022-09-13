const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

/***
 * Una promesa solo se resuelve o rechaza y nada mas me permite devolver una unica información.
 */

// const doSomething = () => {
//   return new Promise( (resolve) => {
//     resolve('valor 1');
//     resolve('valor 2');
//     setTimeout(() => {
//       resolve('valor 3');
//     }, 3000);
//   });
// }

// (async () => {
//   const rta = await doSomething();
//   console.log(rta);
// })()

/**
 * Un Observable me permite multiples datos, al estar siempre escuchado algo sin tener que estar ejecuntando de nuevo una promesa.
 * Puedo tambier hacer transformación y cancelar el observable en un momento dado.
 */

const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout( () => {
      observer.next('valor 4 $')
    }, 5000);
    setTimeout( () => {
      observer.next(null);
    }, 8000);
    setTimeout( () => {
      observer.next('valor 5 $');
    }, 10000);

  })
}

(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe( data => {
    console.log(data);
  })
})()








