export class UserPreferences {
  language: string;
  resourceType: string;
  resultsQuantity: number;
  trackOnInit: boolean;
  units: string;

  constructor (language: string, resourceType: string, resultsQuantity: number, trackOnInit: boolean, units: string) {
    this.language = language;
    this.resourceType = resourceType;
    this.resultsQuantity = resultsQuantity;
    this.trackOnInit = trackOnInit;
    this.units = units;
  }
}
