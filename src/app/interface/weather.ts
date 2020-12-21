interface Location {
  name: string;
  region: string;
  country: string;
  lat: string;
  lon: string;
  tz_id: string;
  localtime_epoch: string;
  localtime: string;
}
interface Condition {
  test: string;
  icon: string;
}
interface Current {
  temp_c: string;
  is_day: string;
  condition: Condition[];
  wind_kph: string;
  pressure_mb: string;
  feelslike_c: string;
  precip_mm: number;
  uv: string;
}

export interface Weather{
  location: Location[];
  current: Current[];
}
