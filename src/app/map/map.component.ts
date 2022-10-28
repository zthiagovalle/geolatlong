import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  public dataLat: string = '';
  public dataLong: string = '';
  public dataHorario: string = '';
  public destino: string = '';

  constructor() {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [-15.909398349780076, -48.00096510495518],
      zoom: 4,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  public generate() {
    if (this.destino) {
      const latDestino = this.destino.split(' ')[0];
      const lonDestino = this.destino.split(' ')[1];
      const circle = L.circleMarker([Number(latDestino), Number(lonDestino)]);
      circle.bindPopup('Destino');
      circle.addTo(this.map);
    }
    if (this.dataLat && this.dataLong && this.dataHorario) {
      const arrayHorarios = this.dataHorario.split('\n');
      const arrayLat = this.dataLat.split('\n');
      const arrayLong = this.dataLong.split('\n');

      for (let index = 0; index < arrayLong.length; index++) {
        const lat = arrayLat[index];
        const lon = arrayLong[index];
        const marker = L.marker([Number(lat), Number(lon)]);
        marker.bindPopup(
          this.makeRoutePopup(index, lat, lon, arrayHorarios[index])
        );
        marker.addTo(this.map);
      }
    }
  }

  public makeRoutePopup(
    index: number,
    lat: string,
    long: string,
    horario: string
  ): string {
    return (
      `` +
      `<div>Rota: ${index}</div>` +
      `<div>Horário: ${horario}</div>` +
      `<div>Latitude: ${lat}</div>` +
      `<div>Longitude: ${long}</div>`
      + ``
    );
  }
}