import React from 'react'

export default ({ weekday, className, localeUtils, locale }) => {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);

  return (
    <div className={className} title={weekdayName}>
      {weekdayName.slice(0, 1)}
    </div>
  )
}