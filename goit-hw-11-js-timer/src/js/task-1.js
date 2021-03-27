  const refs = {
  timerId: document.querySelector('.timer-1'),
  days: document.querySelector('[data-value="days"]'),
 hours: document.querySelector('[ data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]')
  
}


class CountdownTimer{ 
  constructor({selector, targetDate}) {
    this.intervalId = null;
    this.isActive = false;
    const timerId = document.querySelector(this.selector)
    this.targetDate = targetDate;
     this.start();
   
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = this.targetDate;
    this.isActive = true; 
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime ;
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
      const timerEndCounter =  Number(days) + Number(hours) + Number(mins) + Number(secs);
     
      if ( timerEndCounter === 0) {
        updateClockface();
         this.stop();
      };

      updateClockface({ days, hours, mins, secs });
     
    }, 1000);
  }

  stop() { 
    clearInterval(this.intervalId); 
    this.idInterval = null;
  };


  getTimeComponents(time) {
     const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
     const hours =
       pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
};
  
};



const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('April, 26, 2021'),
 
});


function updateClockface({days = 0, hours = 0, mins = 0, secs = 0} ) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
   refs.mins.textContent = mins;
    refs.secs.textContent = secs;
}
  
function pad(value) {
    return String(value).padStart(2, '0');
}