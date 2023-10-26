// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use astro::{
    planet::{self, Planet},
    time::{CalType, Date},
};
use chrono::{Datelike, Days, Months, NaiveDate};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct AppDate {
    year: i32,
    month: u32,
    day: f64,
}

impl From<AppDate> for Date {
    fn from(AppDate { year, month, day }: AppDate) -> Self {
        Date {
            year: year as i16,
            month: month as u8,
            decimal_day: day,
            cal_type: CalType::Gregorian,
        }
    }
}

impl From<NaiveDate> for AppDate {
    fn from(nd: NaiveDate) -> Self {
        Self {
            year: nd.year(),
            month: nd.month0() + 1,
            day: (nd.day0() + 1) as f64,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
enum PlanetName {
    Mercury,
    Venus,
    Earth,
    Mars,
    Jupiter,
    Saturn,
    Uranus,
    Neptune,
}

impl From<PlanetName> for Planet {
    fn from(p: PlanetName) -> Self {
        match p {
            PlanetName::Mercury => Planet::Mercury,
            PlanetName::Venus => Planet::Venus,
            PlanetName::Earth => Planet::Earth,
            PlanetName::Mars => Planet::Mars,
            PlanetName::Jupiter => Planet::Jupiter,
            PlanetName::Saturn => Planet::Saturn,
            PlanetName::Uranus => Planet::Uranus,
            PlanetName::Neptune => Planet::Neptune,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct Coordinates {
    rotation: f64,
}

#[tauri::command]
fn rotation(date: AppDate, planet: PlanetName) -> Coordinates {
    let julian_day = astro::time::julian_day(&date.into());
    let (long_rads, _, _) = planet::heliocent_coords(&planet.into(), julian_day);
    let rotation = long_rads * 180.0 / std::f64::consts::PI;
    Coordinates { rotation }
}

#[tauri::command]
fn update_day(current: AppDate, day: f64) -> Result<AppDate, String> {
    let date_days = current.day as u32;
    let c_date = NaiveDate::from_ymd_opt(current.year, current.month, date_days)
        .ok_or_else(|| "invalid date")?;
    let delta = day - current.day;
    if delta.is_sign_negative() {
        Ok(c_date
            .checked_sub_days(Days::new(delta.abs() as u64))
            .ok_or_else(|| "could not subtract days")?
            .into())
    } else {
        Ok(c_date
            .checked_add_days(Days::new(delta as u64))
            .ok_or_else(|| "could not add days")?
            .into())
    }
}

#[tauri::command]
fn update_month(current: AppDate, month: i32) -> Result<AppDate, String> {
    let date_days = current.day as u32;
    let c_date = NaiveDate::from_ymd_opt(current.year, current.month, date_days)
        .ok_or_else(|| "invalid date")?;
    let delta = month - (current.month as i32);
    if delta.is_negative() {
        Ok(c_date
            .checked_sub_months(Months::new(delta.abs() as u32))
            .ok_or_else(|| "could not subtract months")?
            .into())
    } else {
        Ok(c_date
            .checked_add_months(Months::new(delta as u32))
            .ok_or_else(|| "could not add months")?
            .into())
    }
}

#[tauri::command]
fn update_year(current: AppDate, year: i32) -> Result<AppDate, String> {
    let date_days = current.day as u32;
    Ok(NaiveDate::from_ymd_opt(year, current.month, date_days)
        .ok_or_else(|| "invalid date")?
        .into())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            rotation,
            update_day,
            update_month,
            update_year
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
