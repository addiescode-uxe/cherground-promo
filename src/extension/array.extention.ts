interface ArrayExtended<T> {
    removeLast(): T;
  
    empty(): boolean;
  
    contains(e: T): boolean;
  
    findBy(e: Partial<T>): T[];
  
    filterBy(e: Partial<T>): T[];
  
    // sortBy(e: Partial<{ [k in keyof T]: 'asc' | 'desc' }>): T[];
  
    ifFound(action: (first: T) => void): T[];
  
    ifEmpty(action: () => void): T[];
  }
  
  export function extendArray<T>(target:any = Array.prototype):Array<T> & ArrayExtended<T> {
  
    // prevent custom methods to be listed in the for.. in statement
    let methods = ['removeLast', 'empty', 'contains', 'findBy', 'filterBy', 'sortBy', 'ifFound', 'ifEmpty'];
    for (let m of methods)
      Object.defineProperty(target, m, {
        enumerable: false,
        writable: true
      });
  
    if (!target.removeLast) {
      target.removeLast = function<T>(): T | null | undefined {
        if (this.length == 0)
          return null;
        else if (this.length > 0) {
          let last = this.splice(this.length - 1, 1);
          return last[0];
        } else {
            return null;
        }
      };
    }
    if (!target.contains) {
      target.contains = function <T>(e: T): boolean {
        return this.indexOf(e) >= 0;
      };
    }
    if (!target.empty) {
      target.empty = function(): boolean {
        return this.length == 0;
      };
    }
    if (!target.findBy) {
      target.findBy = function <T>(e: Partial<T>): T[] {
  
        return this.filter((item: T) => {
          let include = true;
          for (let k in e) {
            include = include && item[k] == e[k];
          }
          return include;
        });
      };
    }
    if (!target.filterBy) {
      target.filterBy = function <T>(e: Partial<T>): T[] {
        return this.findBy(e);
      };
    }
    if (!target.ifFound) {
      target.ifFound = function <T>(action: (first: T) => void): T[] {
  
        if (this.length > 0) {
          action(this[0]);
        }
        return this;
      };
    }
    if (!target.ifEmpty) {
      target.ifEmpty = function <T>(action: () => void): T[] {
  
        if (this.length == 0) {
          action();
        }
        return this;
      };
    }
    if (!target.sortBy) {
      target.sortBy = function <T>(e: Partial<{ [k in keyof T]: 'asc' | 'desc' }>): T[] {
        let key = '';
        let sorting = 1;
        for (let ekey in e) {
          key = ekey;
          sorting = e[ekey] == 'asc' ? 1 : -1;
        }
        return this.sort((a1: any, a2: any) => {
  
          if (!a1) return 1;
          if (!a1[key]) return 1;
          if (!a2) return -1;
          if (!a2[key]) return 1;
          if (isNumeric(a1[key]) && isNumeric(a2[key]))
            return (a1[key] - a2[key]) * sorting;
          if (isString(a1[key]) && isString(a2[key]))
            return a1[key].toLowerCase().localeCompare(a2[key].toLowerCase()) * sorting;
          return null;
        });
      };
    }
  
    return target as any
  
  }
  
  function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  
  function isString(s: any) {
    return typeof s === 'string' || s instanceof String;
  }

  declare global {
    interface Array<T> {
      removeLast(): T;
      empty(): boolean;
      contains(e: T): boolean;
      findBy(e: Partial<T>): T[];
      filterBy(e: Partial<T>): T[];
      sortBy(e: Partial<{ [k in keyof T]: 'asc' | 'desc' }>): T[];
      ifFound(action: (first: T) => void): T[];
      ifEmpty(action: () => void): T[];
    }
  }