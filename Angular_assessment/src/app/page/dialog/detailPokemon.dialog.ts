import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { AsyncDialog } from './dialogService';

@Injectable({ providedIn: 'root' })
export class DetailPokemonDialog extends AsyncDialog<any> {
    async open(data): Promise<MatDialogRef<any>> {
        const importedModuleFile = await import(
            '../detail-pokemon/detail-pokemon.component'
        );

        return this.matDialog.open(
            importedModuleFile.DetailPokemonComponent.getComponent(),
            {
                panelClass: 'custom_dialog',
                data,
                maxWidth: '600px',
                width: '100%',
                scrollStrategy: new NoopScrollStrategy(),
                disableClose: true
            }
        );
    }
}
