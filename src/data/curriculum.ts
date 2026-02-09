// AFA 2026-27 Freshman Year Planning - Structured Data
// Source: Polylogue doc "2026-27 Freshman Year Planning"

export interface DayPlan {
  dayNumber: number;
  dayOfWeek: string; // Mon, Tue, Wed, Thu, Fri, Sat
  date?: string; // ISO date if calculable
  blocks: {
    time: string;
    title: string;
    description: string;
    type: 'workshop' | 'business' | 'media' | 'roundtable' | 'harkness' | 'presentation' | 'reflection' | 'fitness' | 'academics' | 'awards' | 'other';
  }[];
}

export interface WeekPlan {
  weekNumber: number;
  title: string;
  days: DayPlan[];
}

export interface TwoWeekChunk {
  id: string;
  title: string;
  subtitle: string;
  weeks: WeekPlan[];
  designPrinciples?: string[];
  endNote?: string;
}

export interface Session {
  id: string;
  number: number;
  title: string;
  theme: string;
  description: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  revenueTarget?: string;
  dailyStructure: { time: string; block: string }[];
  weeklyRecurring: string[];
  mediaInfo: string;
  firstBook?: string;
  chunks: TwoWeekChunk[];
  color: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: 'orientation' | 'session' | 'break';
  color: string;
}

export const calendarEvents: CalendarEvent[] = [
  { id: 'orientation', title: 'Orientation', startDate: '2026-08-03', endDate: '2026-08-07', type: 'orientation', color: '#6366f1' },
  { id: 'session-1', title: 'Session 1: Local Service Businesses', startDate: '2026-08-10', endDate: '2026-10-09', type: 'session', color: '#f59e0b' },
  { id: 'fall-break', title: 'Fall Break', startDate: '2026-10-12', endDate: '2026-10-16', type: 'break', color: '#94a3b8' },
  { id: 'session-2', title: 'Session 2', startDate: '2026-10-19', endDate: '2026-12-18', type: 'session', color: '#10b981' },
  { id: 'winter-break', title: 'Winter Break', startDate: '2026-12-21', endDate: '2027-01-01', type: 'break', color: '#94a3b8' },
  { id: 'session-3', title: 'Session 3', startDate: '2027-01-04', endDate: '2027-03-31', type: 'session', color: '#3b82f6' },
];

export const sessions: Session[] = [
  {
    id: 'session-1',
    number: 1,
    title: 'Local Service Businesses',
    theme: '"Get off the couch. Go sell something."',
    description: 'Students form teams of 2-3 and launch a real local service business — power washing, car detailing, lawn care, junk hauling, vending machines, or event labor. No tech, no apps, no shortcuts. Raw entrepreneurship.',
    startDate: '2026-08-10',
    endDate: '2026-10-09',
    durationWeeks: 8,
    revenueTarget: '$2,000–5,000 per team',
    dailyStructure: [
      { time: '8:30–11:00', block: 'Academics' },
      { time: '11:00–12:00', block: 'Fitness' },
      { time: '12:00–12:45', block: 'Daily Workshop' },
      { time: '12:45–5:00', block: 'Business Work' },
      { time: 'Saturday', block: 'Execution / Field Day' },
    ],
    weeklyRecurring: [
      'Monday–Thursday: Workshop (12:00–12:45) + Business Work (12:45–5:00)',
      'Wednesday: Media Discussion block (replace part of business work)',
      'Friday: Weekly Roundtable + Harkness Circle discussion',
      'Saturday: Field execution day',
    ],
    mediaInfo: 'Students consume 1 book (ongoing), 1 podcast episode, and 1 article/blog post per week. Wednesday media discussions cover podcast and article. Book discussions in Friday Harkness Circles.',
    firstBook: 'The Obstacle Is the Way by Ryan Holiday',
    color: '#f59e0b',
    chunks: [
      {
        id: 'weeks-1-2',
        title: 'Weeks 1–2',
        subtitle: 'Pick Your Business & Build the Machine',
        weeks: [
          {
            weekNumber: 1,
            title: 'Pick Your Business & Know Your Market',
            days: [
              {
                dayNumber: 1, dayOfWeek: 'Mon', date: '2026-08-10',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Session 1 Kick-Off', description: 'What you\'re doing, why it matters, what success looks like. Overview of service business categories. Begin Honor Code drafting — students co-create their code of conduct together.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Team Formation', description: 'Teams form by end of day. Homework: each person comes back tomorrow with their top 3 business picks and why.', type: 'business' },
                ]
              },
              {
                dayNumber: 2, dayOfWeek: 'Tue', date: '2026-08-11',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Opportunity Recognition', description: 'How to spot a market gap. What makes a good local service business vs. a bad one.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Lock In Business & Field Scout', description: 'Teams present picks, debate, lock in business by 2pm. Hit the field — drive around Austin neighborhoods scouting competitors. Take photos of competitor yard signs, ads, listings.', type: 'business' },
                ]
              },
              {
                dayNumber: 3, dayOfWeek: 'Wed', date: '2026-08-12',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Competitive Analysis 101', description: 'How to read reviews to find unmet needs, how to map competitors.', type: 'workshop' },
                  { time: '12:45–3:30', title: 'Competitive Deep Dive', description: 'Map out every competitor: pricing, reviews, strengths, weaknesses. Find the gap.', type: 'business' },
                  { time: '3:30–4:30', title: 'Media Discussion', description: 'Discuss this week\'s assigned article and podcast.', type: 'media' },
                ]
              },
              {
                dayNumber: 4, dayOfWeek: 'Thu', date: '2026-08-13',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Customer Discovery', description: 'How to have conversations that surface real needs, not just confirmation bias. The Mom Test principles.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Talk to 10 Customers', description: 'Each team talks to 10 real potential customers — neighbors, parents\' friends, local businesses. Not selling yet. Just: "Would you pay for this? What would you pay? What matters most to you?" Come back with notes.', type: 'business' },
                ]
              },
              {
                dayNumber: 5, dayOfWeek: 'Fri', date: '2026-08-14',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Weekly Roundtable', description: 'Download from the week. Each team shares what they learned from customer conversations. Peer feedback. Adjust business concepts based on real feedback.', type: 'roundtable' },
                  { time: '1:30–2:30', title: 'Harkness Circle', description: 'First discussion. Topic: what does it mean to build something? (Tied to Honor Code values.)', type: 'harkness' },
                  { time: '2:30–5:00', title: 'Finalize Business Concept', description: 'Finalize one-page business concept — what you\'re selling, to whom, at what price, and why you\'ll win. Honor Code v1 finalized and signed.', type: 'business' },
                ]
              },
              {
                dayNumber: 6, dayOfWeek: 'Sat', date: '2026-08-15',
                blocks: [
                  { time: 'All Day', title: 'Field Scouting', description: 'Teams revisit target neighborhoods, refine competitive research, talk to more potential customers.', type: 'business' },
                ]
              },
            ]
          },
          {
            weekNumber: 2,
            title: 'Plan the Machine',
            days: [
              {
                dayNumber: 7, dayOfWeek: 'Mon', date: '2026-08-17',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Napkin Math / Unit Economics', description: 'What does it actually cost to do one job? Equipment, supplies, gas, time.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Build P&L Model', description: 'Build a simple P&L model. What\'s your margin? How many jobs per week to hit $2K–$5K?', type: 'business' },
                ]
              },
              {
                dayNumber: 8, dayOfWeek: 'Tue', date: '2026-08-18',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Operations & Consistency', description: 'How to build a service checklist so every job is the same quality.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Source Equipment & Practice', description: 'Source equipment (buy, borrow, rent). Build your service checklist. Practice the actual service if possible.', type: 'business' },
                ]
              },
              {
                dayNumber: 9, dayOfWeek: 'Wed', date: '2026-08-19',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Brand Basics', description: 'Naming, flyer design (Canva), writing a pitch.', type: 'workshop' },
                  { time: '12:45–3:30', title: 'Build Brand & Pitch', description: 'Pick a name, make a logo, build a simple flyer. Write your pitch — 30-second version and 2-minute version. Practice on each other.', type: 'business' },
                  { time: '3:30–4:30', title: 'Media Discussion', description: 'Discuss this week\'s article and podcast.', type: 'media' },
                ]
              },
              {
                dayNumber: 10, dayOfWeek: 'Thu', date: '2026-08-20',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Sales 101', description: 'Cold outreach techniques. Door knocking, cold calling, texting. What to say, how to handle objections.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Role-Play & Build Hit List', description: 'Role-play customer interactions in pairs. Get the awkwardness out now. Map your target neighborhoods and build a hit list of 50+ doors/numbers for next week.', type: 'business' },
                ]
              },
              {
                dayNumber: 11, dayOfWeek: 'Fri', date: '2026-08-21',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Weekly Roundtable', description: 'Each team presents their business plan, pricing, pitch. Peer critiques.', type: 'roundtable' },
                  { time: '1:30–2:30', title: 'Harkness Circle', description: 'Book discussion (The Obstacle Is the Way — first section).', type: 'harkness' },
                  { time: '2:30–5:00', title: 'Dry Run', description: 'Each team does one real job — free or discounted — for someone they know. Full execution start to finish.', type: 'business' },
                ]
              },
              {
                dayNumber: 12, dayOfWeek: 'Sat', date: '2026-08-22',
                blocks: [
                  { time: 'All Day', title: 'Dry Run Debrief & Fix Day', description: 'What went wrong? What took longer than expected? What do you need to fix before you go live Monday?', type: 'business' },
                ]
              },
            ]
          }
        ],
        endNote: 'They walk into Week 3 with a tested service, a price, a pitch, and a list of 50 doors to knock on.'
      },
      {
        id: 'weeks-3-4',
        title: 'Weeks 3–4',
        subtitle: 'Customer Acquisition Blitz',
        designPrinciples: [
          'Flex time is essential. Teams that have booked jobs need time to deliver. Teams struggling to convert need fast guide feedback on their pitch.',
          'Public leaderboard starts Week 3. Two metrics tracked daily: (1) outreach attempts, (2) revenue booked. Visible to everyone.',
          '6-day weeks continue. Saturday is for executing booked jobs and extra outreach.',
        ],
        weeks: [
          {
            weekNumber: 3,
            title: 'Go Get Customers',
            days: [
              {
                dayNumber: 13, dayOfWeek: 'Mon', date: '2026-08-24',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Rejection Therapy Intro', description: 'Why rejection is the goal, not the obstacle. Set the frame: you\'re collecting nos.', type: 'workshop' },
                  { time: '12:45–5:00', title: '15 Cold Outreach Attempts', description: 'Target: every team does 15 cold outreach attempts today — door knocking, flyers, in-person conversations. Leaderboard goes up on the wall.', type: 'business' },
                ]
              },
              {
                dayNumber: 14, dayOfWeek: 'Tue', date: '2026-08-25',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Pitch Refinement', description: 'Quick workshop on adjusting your approach based on yesterday\'s feedback.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Another 15 Attempts', description: 'Adjust: different pitch, different neighborhoods, different approach. First team to book a paying job gets recognized.', type: 'business' },
                ]
              },
              {
                dayNumber: 15, dayOfWeek: 'Wed', date: '2026-08-26',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Rejection Therapy Deep Dive', description: 'Share the worst rejections — make it funny, make it a badge of honor. Normalize the nos.', type: 'workshop' },
                  { time: '12:45–3:30', title: 'Outreach Round 3', description: 'Target: every team should have at least 2-3 booked jobs by end of day.', type: 'business' },
                  { time: '3:30–4:30', title: 'Media Discussion', description: 'Weekly article + podcast discussion.', type: 'media' },
                ]
              },
              {
                dayNumber: 16, dayOfWeek: 'Thu', date: '2026-08-27',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Daily Check-In', description: 'Teams share what\'s working and what isn\'t. Guides give direct pitch feedback to struggling teams.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Execute & Sell', description: 'Teams with jobs booked — go deliver. Teams without — keep knocking. This is where the split starts.', type: 'business' },
                ]
              },
              {
                dayNumber: 17, dayOfWeek: 'Fri', date: '2026-08-28',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Weekly Roundtable', description: 'Week 3 review. Doors knocked, conversations had, jobs booked, jobs completed, revenue collected. Brutally honest. Leaderboard update.', type: 'roundtable' },
                  { time: '1:30–2:30', title: 'Harkness Circle', description: 'Book discussion (The Obstacle Is the Way — continued).', type: 'harkness' },
                  { time: '2:30–5:00', title: 'Set Next Week Targets', description: 'Teams with no bookings get intensive guide coaching on pitch and approach.', type: 'business' },
                ]
              },
              {
                dayNumber: 18, dayOfWeek: 'Sat', date: '2026-08-29',
                blocks: [
                  { time: 'All Day', title: 'Execute & Outreach Blitz', description: 'Execute booked jobs. Teams without bookings do a Saturday outreach blitz.', type: 'business' },
                ]
              },
            ]
          },
          {
            weekNumber: 4,
            title: 'Scale the Hustle',
            days: [
              {
                dayNumber: 19, dayOfWeek: 'Mon', date: '2026-08-31',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Referral Strategies', description: 'How to turn one happy customer into three more. Ask for referrals, leave extra flyers, offer a discount for introductions.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'New Outreach + Follow-Ups', description: 'Mix of new outreach and follow-ups with past customers.', type: 'business' },
                ]
              },
              {
                dayNumber: 20, dayOfWeek: 'Tue', date: '2026-09-01',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Repeat Business & Upselling', description: 'Can you sign them up weekly? Can you do their neighbor\'s too?', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Convert to Recurring Revenue', description: 'Focus on converting one-time jobs into recurring revenue. Out in the field.', type: 'business' },
                ]
              },
              {
                dayNumber: 21, dayOfWeek: 'Wed', date: '2026-09-02',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Pricing Gut Check', description: 'Are you charging enough? Review actual time per job, costs, margin. Adjust if needed.', type: 'workshop' },
                  { time: '12:45–3:30', title: 'Sell & Deliver', description: 'Not a day off from selling.', type: 'business' },
                  { time: '3:30–4:30', title: 'Media Discussion', description: 'Weekly article + podcast discussion.', type: 'media' },
                ]
              },
              {
                dayNumber: 22, dayOfWeek: 'Thu', date: '2026-09-03',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Team Check-In', description: 'Quick team check-in + guide feedback.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Big Push Day', description: 'Every team goes all out. Last full selling day before the Friday review. Goal: enough pipeline that Weeks 5-6 are mostly execution.', type: 'business' },
                ]
              },
              {
                dayNumber: 23, dayOfWeek: 'Fri', date: '2026-09-04',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–2:00', title: 'Mid-Session Checkpoint', description: 'Full team presentations — revenue to date, customer count, pipeline, biggest lessons. Honest P&L review. Leaderboard update.', type: 'roundtable' },
                  { time: '2:00–3:00', title: 'Harkness Circle', description: 'Book discussion.', type: 'harkness' },
                  { time: '3:00–5:00', title: 'Set Execution Targets', description: 'Set execution targets for Weeks 5-6.', type: 'business' },
                ]
              },
              {
                dayNumber: 24, dayOfWeek: 'Sat', date: '2026-09-05',
                blocks: [
                  { time: 'All Day', title: 'Execute & Pipeline Overflow', description: 'Execute booked jobs. Pipeline overflow day.', type: 'business' },
                ]
              },
            ]
          }
        ],
        endNote: 'By end of Week 4, every team should have real revenue, repeat customers, and a pipeline of booked work heading into the execution phase.'
      },
      {
        id: 'weeks-5-6',
        title: 'Weeks 5–6',
        subtitle: 'Run the Business & Push for the Number',
        designPrinciples: [
          'Dedicated booking hours. Students need to establish set daily hours for executing work.',
          'Leaderboard continues. Revenue and outreach tracked daily.',
          'The balance shifts. More time executing, less time hunting. But teams behind on revenue still need to sell.',
        ],
        weeks: [
          {
            weekNumber: 5,
            title: 'Run the Business',
            days: [
              {
                dayNumber: 25, dayOfWeek: 'Mon', date: '2026-09-07',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Operations & Systems', description: 'How to track jobs, manage a schedule, not drop balls when you have 5 customers. Build a simple booking system.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Execute Booked Work', description: 'Execute booked work. Leaderboard update.', type: 'business' },
                ]
              },
              {
                dayNumber: 26, dayOfWeek: 'Tue', date: '2026-09-08',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Collecting Testimonials', description: 'How to ask, when to ask, what to do with them. Social proof matters.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Deliver & Collect Testimonials', description: 'Deliver jobs + circle back to past customers for testimonials and referrals.', type: 'business' },
                ]
              },
              {
                dayNumber: 27, dayOfWeek: 'Wed', date: '2026-09-09',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'P&L Deep Dive', description: 'Every team updates their actual numbers. What\'s your real margin? Are you losing money on certain jobs?', type: 'workshop' },
                  { time: '12:45–3:30', title: 'Execute & Sell', description: 'Execute and sell.', type: 'business' },
                  { time: '3:30–4:30', title: 'Media Discussion', description: 'Weekly article + podcast discussion.', type: 'media' },
                ]
              },
              {
                dayNumber: 28, dayOfWeek: 'Thu', date: '2026-09-10',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Time Management & Prioritization', description: 'You\'ve got more demand than hours. How do you decide which jobs to take? Which customers to prioritize?', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Full Execution Afternoon', description: 'Delivering, selling, following up.', type: 'business' },
                ]
              },
              {
                dayNumber: 29, dayOfWeek: 'Fri', date: '2026-09-11',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Weekly Roundtable', description: 'What worked, what didn\'t, peer feedback. Updated P&L, customer count, pipeline. Leaderboard update.', type: 'roundtable' },
                  { time: '1:30–2:30', title: 'Harkness Circle', description: 'Book discussion (The Obstacle Is the Way — continued).', type: 'harkness' },
                  { time: '2:30–5:00', title: 'Set Week 6 Goals', description: 'Set goals for Week 6.', type: 'business' },
                ]
              },
              {
                dayNumber: 30, dayOfWeek: 'Sat', date: '2026-09-12',
                blocks: [
                  { time: 'All Day', title: 'Execution Day', description: 'No workshops, no discussions. Just go work.', type: 'business' },
                ]
              },
            ]
          },
          {
            weekNumber: 6,
            title: 'Push for the Number',
            days: [
              {
                dayNumber: 31, dayOfWeek: 'Mon', date: '2026-09-14',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Upselling & Bundling', description: 'Can you offer packages? Weekly service? Add-ons? How to increase revenue per customer.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Execute & Sell', description: 'The revenue target is getting real — teams should know exactly how many more jobs they need.', type: 'business' },
                ]
              },
              {
                dayNumber: 32, dayOfWeek: 'Tue', date: '2026-09-15',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Handling Complaints', description: 'What happens when a customer isn\'t happy? Role-play bad scenarios.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Deliver & Acquire', description: 'Deliver and acquire.', type: 'business' },
                ]
              },
              {
                dayNumber: 33, dayOfWeek: 'Wed', date: '2026-09-16',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Delegation & Leverage', description: 'If you had to hire someone, how would you train them? Could your business run without you for a day?', type: 'workshop' },
                  { time: '12:45–3:30', title: 'Execute', description: 'Execute.', type: 'business' },
                  { time: '3:30–4:30', title: 'Media Discussion', description: 'Weekly article + podcast discussion.', type: 'media' },
                ]
              },
              {
                dayNumber: 34, dayOfWeek: 'Thu', date: '2026-09-17',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Final Push Check-In', description: 'Where is every team against the target? What\'s the plan for the last two days?', type: 'workshop' },
                  { time: '12:45–5:00', title: 'All Hands on Deck', description: 'Book every last job you can, deliver everything outstanding. Collect final testimonials.', type: 'business' },
                ]
              },
              {
                dayNumber: 35, dayOfWeek: 'Fri', date: '2026-09-18',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Weekly Roundtable', description: 'Week 6 review. Full P&L presentations. Revenue check against targets. Leaderboard update.', type: 'roundtable' },
                  { time: '1:30–2:30', title: 'Harkness Circle', description: 'Book discussion.', type: 'harkness' },
                  { time: '2:30–5:00', title: 'Close Books', description: 'Finish outstanding work. No new bookings — you\'re closing the books.', type: 'business' },
                ]
              },
              {
                dayNumber: 36, dayOfWeek: 'Sat', date: '2026-09-19',
                blocks: [
                  { time: 'All Day', title: 'Last Execution Saturday', description: 'Finish any outstanding jobs.', type: 'business' },
                ]
              },
            ]
          }
        ],
        endNote: 'By end of Week 6, every team should have hit or be close to their revenue target, and the business should be fully operational.'
      },
      {
        id: 'weeks-7-8',
        title: 'Weeks 7–8',
        subtitle: 'Scale, Project, Reflect & Transition',
        designPrinciples: [
          'Week 7 is forward-looking: projections, Teardown critique, one last growth push.',
          'Week 8 is backward-looking: what happened, what did I learn, and what do I do with this thing now?',
        ],
        weeks: [
          {
            weekNumber: 7,
            title: 'Where Could This Go?',
            days: [
              {
                dayNumber: 37, dayOfWeek: 'Mon', date: '2026-09-21',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:00', title: 'The 4-Year Math', description: 'Business Projection. Take your actual numbers and project forward. If you kept this pace for a year? If you grew 10% month-over-month for 4 years? A business that made $3K in two months could be $100K+/year by graduation.', type: 'workshop' },
                  { time: '1:00–5:00', title: 'Final Growth Push Begins', description: 'Every team should have a specific revenue target for the last two weeks.', type: 'business' },
                ]
              },
              {
                dayNumber: 38, dayOfWeek: 'Tue', date: '2026-09-22',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Scaling Levers', description: 'What would need to change to 10x this business? More customers? Higher prices? Hiring help? Teams identify top 2-3 scaling levers and pick one to test.', type: 'workshop' },
                  { time: '12:45–5:00', title: 'Test Scaling Lever', description: 'Execute on the scaling lever. Raise prices? Go pitch premium packages. Expand territory? New neighborhoods.', type: 'business' },
                ]
              },
              {
                dayNumber: 39, dayOfWeek: 'Wed', date: '2026-09-23',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–12:45', title: 'Competitive Moats', description: 'What makes your business defensible? Relationships? Reputation? Speed? Quality? Honest assessment.', type: 'workshop' },
                  { time: '12:45–3:30', title: 'Execute & Sell', description: 'Execute and sell.', type: 'business' },
                  { time: '3:30–4:30', title: 'Media Discussion', description: 'Weekly article + podcast discussion.', type: 'media' },
                ]
              },
              {
                dayNumber: 40, dayOfWeek: 'Thu', date: '2026-09-24',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Teardown Session', description: 'First full Teardown. Each team presents for 10 min, then takes 10 min of structured critique. Peer-driven honest feedback.', type: 'presentation' },
                  { time: '1:30–5:00', title: 'Incorporate Feedback & Push', description: 'Incorporate Teardown feedback. Last push for new customers.', type: 'business' },
                ]
              },
              {
                dayNumber: 41, dayOfWeek: 'Fri', date: '2026-09-25',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Weekly Roundtable', description: 'Full financial review. Updated P&L, projection models, progress on scaling lever experiments. Final standings taking shape.', type: 'roundtable' },
                  { time: '1:30–2:30', title: 'Harkness Circle', description: 'Book discussion (Shoe Dog — later chapters on scaling, near-death moments, the long game).', type: 'harkness' },
                  { time: '2:30–5:00', title: 'Final Saturday Prep', description: 'What needs to happen tomorrow to close strong?', type: 'business' },
                ]
              },
              {
                dayNumber: 42, dayOfWeek: 'Sat', date: '2026-09-26',
                blocks: [
                  { time: 'All Day', title: 'Last Execution Saturday', description: 'Deliver outstanding jobs. Collect final payments. Last day of active business operations.', type: 'business' },
                ]
              },
            ]
          },
          {
            weekNumber: 8,
            title: 'Close the Books & Look Back',
            days: [
              {
                dayNumber: 43, dayOfWeek: 'Mon', date: '2026-09-28',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:00', title: 'Closing the Books', description: 'Finalize all P&L numbers. Every dollar in, every dollar out. Calculate final margins, total revenue, total profit. No fudging.', type: 'workshop' },
                  { time: '1:00–5:00', title: 'Presentation Prep', description: 'Teams build their final presentations. 15 minutes per team — the story of the business from day 1 to now.', type: 'business' },
                ]
              },
              {
                dayNumber: 44, dayOfWeek: 'Tue', date: '2026-09-29',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:00', title: 'True Cost Analysis & Disposition', description: 'Reprice with real labor costs ($15-20/hr). Is the business still profitable? Then choose: Wind Down, Autopilot, or Keep Going & Hire. Draft one-page Disposition Plan.', type: 'workshop' },
                  { time: '1:00–5:00', title: 'Presentation Prep & Peer Review', description: 'Continue presentation prep. Peer review of Disposition Plans.', type: 'business' },
                ]
              },
              {
                dayNumber: 45, dayOfWeek: 'Wed', date: '2026-09-30',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–3:30', title: 'Final Presentations — Part 1', description: 'Half the teams present. 15 min per team + 10 min Q&A. Mentors and staff attend. Formal. Judges score on clarity, honesty, financial analysis, lessons.', type: 'presentation' },
                  { time: '3:30–4:30', title: 'Final Media Discussion', description: 'Final media discussion for Session 1. Reflect on how books and content connected to the experience.', type: 'media' },
                ]
              },
              {
                dayNumber: 46, dayOfWeek: 'Thu', date: '2026-10-01',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–3:30', title: 'Final Presentations — Part 2', description: 'Remaining teams present. Same format.', type: 'presentation' },
                  { time: '3:30–4:30', title: 'Awards & Recognition', description: 'Not just revenue — awards for best Teardown feedback, most improved, best customer relationships, highest integrity moment.', type: 'awards' },
                ]
              },
              {
                dayNumber: 47, dayOfWeek: 'Fri', date: '2026-10-02',
                blocks: [
                  { time: '8:30–11:00', title: 'Academics', description: '', type: 'academics' },
                  { time: '11:00–12:00', title: 'Fitness', description: '', type: 'fitness' },
                  { time: '12:00–1:30', title: 'Personal Reflection', description: 'Individual written reflection. What was the hardest moment? When did you want to quit? What are you most proud of? How have you changed?', type: 'reflection' },
                  { time: '1:30–3:00', title: 'Group Reflection', description: 'Open conversation. What did we learn as a cohort? What should next year\'s freshmen know?', type: 'reflection' },
                  { time: '3:00–5:00', title: 'Disposition Plan Execution', description: 'Start executing. Wind-down teams notify customers. Autopilot teams set up systems. Keep-going teams build hiring & ops plans.', type: 'business' },
                ]
              },
              {
                dayNumber: 48, dayOfWeek: 'Sat', date: '2026-10-03',
                blocks: [
                  { time: 'Morning', title: 'Disposition Wrap-Up', description: 'Finish remaining wind-down or transition tasks. Every team leaves with business in a defined state.', type: 'business' },
                  { time: 'Afternoon', title: 'Session 1 Close', description: 'Brief ceremony or group activity to mark the end. Celebrate what they built. Break begins.', type: 'other' },
                ]
              },
            ]
          }
        ],
        endNote: 'Students enter the break with their business in a deliberate state — wound down, on autopilot, or handed off to hired help.'
      }
    ]
  }
];
