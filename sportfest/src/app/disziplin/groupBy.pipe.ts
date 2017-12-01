import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): Array<any> {
    let props: string[] = field.split(".");
    let groups: any[] = [];
    groups.push(value[0]);
    for (var i = 1; i < value.length; i++) {
      let add: boolean = true;
      for (var inner = 0; inner < groups.length; inner++) {
        let cur: any = value[i];
        let prev: any = groups[inner];
        for (let prop of props) {
          prev = prev[prop];
          cur = cur[prop];
        }
        if (prev == cur) {
          add = false;
          break;
        }
      }
      if (add)
        groups.push(value[i]);
    }

    return groups;
  }
}