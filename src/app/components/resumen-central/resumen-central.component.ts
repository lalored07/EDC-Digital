import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CentralService } from 'src/app/api/central.service';
import { VerDetalleComponent } from '../ver-detalle/ver-detalle.component';

@Component({
  selector: 'app-resumen-central',
  templateUrl: './resumen-central.component.html',
  styleUrls: ['./resumen-central.component.css']
})
export class ResumenCentralComponent {

  constructor(
    public dialog: MatDialog,
    public centralService: CentralService
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(VerDetalleComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
