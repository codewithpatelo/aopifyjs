declare module 'ahp-lite' {
    export default class AHP {
      addItem(name: string): void;
      addCriteria(name: string): void;
      rank(): any;
      setItemPriority(item: string, criteria: string, priority: number): void;
      // Agrega más métodos según lo que exponga `ahp-lite` (si puedes consultar la documentación o el código fuente).
    }
  }
  