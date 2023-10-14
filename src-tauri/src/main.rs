// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use astro::{planet::{Planet, self}, time::{Date, CalType}};
use chrono::{NaiveDate, Datelike, Days, Months};
use serde::{Serialize, Deserialize};

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

#[derive(Debug, Serialize, Deserialize)]
struct Coordinates {
    rotation: f64,
}

#[tauri::command]
fn rotation(date: AppDate) -> Coordinates {
    let julian_day = astro::time::julian_day(&date.into());
    let (long_rads, _, _) = planet::heliocent_coords(&Planet::Earth, julian_day);
    let rotation = long_rads * 180.0 / std::f64::consts::PI;
    Coordinates { rotation }
}

#[tauri::command]
fn update_day(current: AppDate, day: f64) -> Result<AppDate, String> {
    let date_days = current.day as u32;
    let c_date = NaiveDate::from_ymd_opt(current.year, current.month, date_days).ok_or_else(|| "invalid date")?;
    let delta = day - current.day;
    if delta.is_sign_negative() {
        Ok(c_date.checked_sub_days(Days::new(delta.abs() as u64)).ok_or_else(|| "could not subtract days")?.into())
    } else {
        Ok(c_date.checked_add_days(Days::new(delta as u64)).ok_or_else(|| "could not add days")?.into())
    }
}

#[tauri::command]
fn update_month(current: AppDate, month: i32) -> Result<AppDate, String> {
    let date_days = current.day as u32;
    let c_date = NaiveDate::from_ymd_opt(current.year, current.month, date_days).ok_or_else(|| "invalid date")?;
    let delta = month - (current.month as i32);
    if delta.is_negative() {
        Ok(c_date.checked_sub_months(Months::new(delta.abs() as u32)).ok_or_else(|| "could not subtract months")?.into())
    } else {
        Ok(c_date.checked_add_months(Months::new(delta as u32)).ok_or_else(|| "could not add months")?.into())
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            rotation,
            update_day,
            update_month,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
