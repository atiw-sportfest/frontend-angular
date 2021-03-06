import { PipeTransform, Pipe } from "@angular/core";
import { AnmeldungNEU } from "../interfaces";

@Pipe({ name: 'group' })
export class GroupPipe implements PipeTransform {
  transform(value: Array<any>, params: any): Array<any> {
    let groups: any[] = [];
    for (var anmeldung of value) {
      var add: boolean = true;
      for (var group of groups) {
        if (group.label == anmeldung.schueler.klasse.bezeichnung) {
          group.anmeldungen.push(anmeldung);
          add = false;
          break;
        }
      }
      if (add)
        groups.push({
          label: anmeldung.schueler.klasse.bezeichnung,
          anmeldungen: [anmeldung]
        });
    }
    return groups;
  }
}