import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import Header from './components/MedallionDrop/MoonMaidTermsCondition/Header';
import Footer from './components/MedallionDrop/MoonMaidTermsCondition/Footer';
import Partners from './components/MedallionDrop/MoonMaidTermsCondition/Partners';
import Classes from './components/styles/MedallionDrop/MoonMaidTermsCondition/MoonMaidTermsCondition.module.scss';

const MoonMaidTermsCondition = () => {
  const scheduleRowData = [
    {
      title: 'Promotion name',
      description: 'Frazetta Frenzy Moon Maid',
    },
    {
      title: 'Eligible States/Territories',
      description: 'NSW, QLD, VIC ',
    },
    {
      title: 'Promotion period ',
      description:
        'Start: 23 Apr 2022 6:00 AM \n End: 30 Apr 2022 6.00 AM \n No entries will be accepted outside this time.',
    },
    {
      title: 'Website address ',
      description: 'everscapes.io ',
    },
    {
      title: 'Promoter',
      description:
        'Artefy Pty Ltd \n ABN: 33650695248 \n C/GMP Partners Pty Limited \n Suite 402, Level 24, Tower 2, 101 Grafton St \n  Bondi Junction NSW 2022 ',
    },
    {
      title: 'Eligible entrants \n \n Details of prizes',
      description:
        'Entry to the Promotion is open to Australian residents in all eligible states/territories who fulfil the method of entry requirements. \n \n 1st Prize – Moon Maid Playable NFT x 1 - $12,000 \n 2nd Prize - Arcadia - One lot of VulcanVerse Land - exclusive NFT ownership x 1 $10,000 \n 3rd Prize - Gardens of Arcadia NFT x 1 - $3,500 \n  4th Prize – Moon Maid Armour in Game item x 10 valued at $3000 \n 5th Prize – Moon Maid Weapon in Game NFT x 10 at $3000 \n  6th Prize – Moon Maid Helmet in Game NFT x 10 valued at $3000 \n  7th prize - EverScapes Moon Maid NFT as created by Jimmi X x 50 valued at $100  \n  8th Prize - EverScapes Frazetta tribute Art NFT x 250 valued at $50 ',
    },
    {
      title: 'Total number of prizes ',
      description: '333 ',
    },
    {
      title: 'Total prize value ',
      description: 'Total prize pool (inc GST): $133,000.00 ',
    },
    {
      title: 'Method of entry ',
      description:
        'To enter, an entrant must, during the promotional period, purchase an eligible non-Fungible Token/s (NFT) from the Frazetta Frenzy landing page available on everscapes.io to receive an entry/s into the draw to randomly win from the pool of Frazetta Frenzy Moon Maid prizes. Entrants must retain copies of all purchase receipts for all entries. All entries by the entrant may otherwise be declared invalid. ',
    },
    {
      title: 'Maximum number of entries ',
      description:
        'The number of entries for each purchase is dependent on the purchase price as per the following: \n \n Purchase 1 $20 NFT to receive 1 entry \n Purchase 1 $100 NFT to receive 7 entries \n Purchase 1 $250 NFT to receive 20 entries \n Purchase 1 $500 NFT to receive 50 entries \n Purchase 1 $1000 NFT to receive 120 entries  ',
    },
    {
      title: 'Prize draw',
      description:
        'A random prize draw, in the presence of an independent scrutineer, will occur 3:00 PM on 05 May 2022 \n \n Location of draw: \n Trade Promotions and Lotteries Pty Ltd \n Level 2, 11 York Street Sydney NSW 2000 ',
    },
    {
      title: 'Notification of winners ',
      description:
        'Winners will be notified via Direct message on social media no later than 6 May 2022. ',
    },
    {
      title: 'Public announcement of winners ',
      description:
        'The winners of all prizes will be published here: \n everscapes.io on 06 May 2022 ',
    },
    {
      title: 'Unclaimed prize draw ',
      description:
        'A random unclaimed prize draw, in the presence of an independent scrutineer, will occur 3:00 PM on 18 Aug 2022 \n \n Location of draw: \n Trade Promotions and Lotteries Pty Ltd \n Level 2, 11 York Street Sydney NSW 2000 ',
    },
    {
      title: 'Notification of unclaimed prize winners ',
      description:
        'Unclaimed prize winners will be notified via Direct message on social media no later than 25 Aug 2022. ',
    },
    {
      title: 'Public announcement of winners \n from unclaimed prize draw ',
      description:
        'The winners of all unclaimed prizes will be published here: \n everscapes.io on 19 Aug 2022 ',
    },
    {
      title: 'Permit reference',
      description: 'Authorised under \n  NSW Authority No. TP/01421 ',
    },
  ];
  const termsData = [
    {
      listItem:
        'Information on how to enter and prize details form part of these terms & conditions (Terms of entry). The Terms must be read in conjunction with the Schedule. \n The Schedule defines the terminology used in these Terms of entry. Where there is any inconsistency between these Terms and the Schedule, the Schedule prevails. \n Participation in this Promotion is deemed acceptance of these Terms of entry.',
    },
    {
      listItem:
        'Entry is open only to legal residents of the Eligible States/Territories who satisfy the Method of entry. Directors,  officers, management, employees, suppliers (including prize suppliers) and contractors (and the immediate families of directors, officers, management, employees, suppliers and contractors) of the Promoter and of its related bodies corporate, and of the agencies and companies associated with this Promotion, including the competition permit providers TPAL(Trade Promotions and Lotteries Pty Ltd) are ineligible to enter. Immediate family means any of the following: spouse,  ex-spouse, child or step-child (whether natural or by adoption), parent, step-parent, grandparent, step-grandparent, uncle, aunt, niece, nephew, brother, sister, step-brother, step-sister or first cousin.',
    },
    {
      listItem: 'The Promotion will be conducted during the Promotion period.',
    },
    {
      listItem:
        'The time zone applicable to any time stated relates to the state or territory where the Promoter is located, unless expressly stated to the contrary.',
    },
    {
      listItem:
        'The Prize/s are specified in the Details of prizes section of the Schedule.',
    },
    {
      listItem:
        'The total prize pool is specified in the Total prize value section of the Schedule.',
    },
    {
      listItem:
        'Neither the Promoter nor the voucher provider is liable for any voucher that has been stolen, forged, lost, damaged or tampered with in any way.',
    },
    {
      listItem:
        'Entrants are advised that tax implications may arise from their prize winnings and they should seek independent financial advice prior to acceptance of their prize(s). The Promoter accepts no responsibility for any tax implications that may arise from  accepting a prize. Entrants are responsible for any and all expenses that they incur in entering the competition and they  will not be reimbursed regardless of whether or not they win the competition.',
    },
    {
      listItem:
        'The entrants must follow the Method of entry during the Promotion period to enter the Promotion. Failure to do so will result in an invalid entry. The Promoter will not advise an Entrant if their entry is deemed invalid.',
    },
    {
      listItem:
        'The time of entry will be deemed to be the time the entry is received by the Promoter.',
    },
    {
      listItem:
        'Entrants may submit up to the Maximum number of entries (if applicable).',
    },
    {
      listItem:
        'The Promoter accepts no responsibility for any late, lost, delayed, incomplete, incorrectly submitted, corrupted, illegible or misdirected entries, claims or correspondence whether due to  omission, error, alteration, tampering, deletion, theft, destruction, disruption to any communication network or medium,  or otherwise including those entries not received by the  Promoter for any reason. The Promoter is not liable for any  consequences of user error including (without limitation) costs incurred. No correspondence will be entered into.',
    },
    {
      listItem:
        'The prize(s) will be awarded to the valid entrant(s) drawn randomly in accordance with the Prize draw details. The Promoter  may draw additional reserve entries (and record them in order). In the event of an invalid entry or an ineligible entrant, or if the entrant is ineligible to accept the prize, the prize will be awarded to the first reserve entry drawn. If the prize can’t be awarded to the entrant drawn, the promoter will then continue this process until the prize is awarded.',
    },
    {
      listItem:
        'The winner does not need to be present at the draw unless expressly stated to the contrary.',
    },
    {
      listItem:
        'The winner(s) will be notified in accordance with the  Notification of winners and Notification of unclaimed prize  winners (if applicable) sections of the Schedule. Notification  to winners will be deemed to have occurred on the later of the  time the winner receives actual notification from the Promoter  or two business days thereafter. The notification will include details about how the prize(s) can be claimed.',
    },
    {
      listItem:
        "The Promoter takes no responsibility where it is unable to contact prize winners who have not provided correct or complete contact details. If an entrant’s contact details change during the promotional period, it is the entrant's responsibility to  notify the Promoter. A request to modify any entry information should be directed to Promoter.",
    },
    {
      listItem:
        'It is a condition of accepting any prize that the winner must comply with all the conditions of use of the prize and the prize supplier’s requirements. Each prize must be taken as stated and no compensation will be payable if a winner is unable to use the  prize as stated.',
    },
    {
      listItem:
        'The winner(s) name and state/territory of residence will be published in accordance with the Public announcement of winners section of the Schedule (if applicable).',
    },
    {
      listItem:
        'If the prize(s) has not been claimed by the Unclaimed prize draw  time and date and subject to any written directions from a State lottery agency, the Promoter may conduct an Unclaimed prize draw in accordance with the Unclaimed prize draw section of the  Schedule (if applicable). In the event the Unclaimed prize draw takes place, the Promoter will attempt to contact the winner(s) of the Unclaimed prize draw in accordance with the Notification of unclaimed prize draw section of the Schedule, and if applicable, the name and State/Territory of residency of any  winner(s) of the Unclaimed prize draw will be published in  accordance with the section of the Schedule entitled Public  announcement of winners from unclaimed prize draw. If a prize is no longer available the promoter may substitute with a prize of higher or equal value subject to any written directions from a regulatory authority. The promoter is not allowed to deduct any administrative costs associated with provision of the prize.',
    },
    {
      listItem:
        ' To the greatest extent permitted by law, the Promoter excludes all warranties, representations or guarantees (Warranties) regarding the Promotion and any prizes, including any Warranties which may have been made in the course of advertising or promoting the Promotion. The conduct of the Promotion or the supply of prizes may involve third parties, and the Promoter   makes no Warranties and disclaims all liability in connection with any such third parties, their acts or omissions. By entering the Promotion, an entrant releases and indemnifies the  Promoter and its related bodies corporate (including the officers, employees and agents of each) from and against all  actions, penalties, liabilities, claims or demands the entrant may have against the Promoter or that the Promoter may incur for  any loss or damage which is or may be suffered or sustained as a   direct or indirect result of an entrant entering or  participating in the Promotion or winning or failing to win a  prize, or using or permitting any other person to use the prize, except for any liability which cannot be excluded by law or which would cause any part of this clause to be void or unenforceable.',
    },
    {
      listItem:
        'If despite the foregoing clause, the Promoter incurs a liability  to an entrant under any law which implies a Warranty into these Terms of entry which cannot legally be excluded, the Promoter’s liability in respect of the Promotion is limited, in the Promoter’s discretion, to either resupplying such goods or services as form part of the Promotion, or paying the cost of resupplying those goods or services.',
    },
    {
      listItem:
        'Without limiting any of the foregoing, in no circumstances will an entrant or the Promoter have any liability to the other for any loss or damage suffered which is indirect or consequential in nature, including without limitation any loss of profit, loss of reputation, loss of goodwill, or loss of business opportunity.',
    },
    {
      listItem:
        'The Promoter and its associated agencies and companies will not be liable for any delay, damage, or loss in transit of prizes.',
    },
    {
      listItem:
        'The Promoter may in its absolute discretion not accept a particular entry, may disqualify an entry, or cancel the entire Promotion at any time without giving reasons and without liability to any entrants, subject to any written directions from a regulatory authority. Without limiting this the Promoter reserves the right to verify the validity of entries, prize claims and entrants and to disqualify any entrant who submits an entry or prize claim that is misleading or not in accordance with these Terms of entry or who manipulates or tampers with the entry process. In the event that a winner breaches these Terms of entry, the winner will forfeit the prize in whole and no substitute will be offered. Verification is at the discretion of the Promoter, whose decision is final. Failure by the Promoter to enforce any of its rights at any stage does not constitute a waiver of those rights.',
    },
    {
      listItem:
        'Prizes, or any unused portion of a prize, are not transferable or exchangeable and cannot be taken as cash, subject to any written directions from a regulatory authority. Where a prize is unavailable for any reason, the Promoter may substitute the  prize for another item of equal or higher value subject to any written directions from a regulatory authority. The Promoter accepts no responsibility for any variation in prize value (including between advertising of the Promotion and receipt of the prize).',
    },
    {
      listItem:
        'In the case of the intervention of any outside act, agent or event which prevents or significantly hinders the Promoter’s ability (or that of a third party involved with the Promotion) to proceed with the Promotion on the dates and in the manner  described in these Terms of entry, including but not limited to vandalism, natural disasters, acts of God, civil unrest, strike,  war, act of terrorism, the Promoter’s obligations in respect of the Promotion will be suspended for the duration of the event and, in addition, the Promoter may in its absolute discretion cancel the promotion and recommence it from the start on the same conditions, subject to approval of the relevant authorities.',
    },
    {
      listItem:
        'All entries become the property of the Promoter. As a condition of entering into this Promotion, entrants agree to assign all their rights in and to their entry and any related content to the Promoter, including any copyright or other intellectual  property rights in the entry and related content. Without  limiting this, the Promoter may use entry content for any and all purposes including commercial purposes. You warrant that  entry content is original, lawful and not misleading and that the Promoter’s use of such content will not infringe the rights of any third parties. The Promoter has no obligation to credit  you as the author of any content submitted and may otherwise do  any acts or omissions which would otherwise constitute an infringement of any moral rights you may have as an author of content.',
    },
    {
      listItem:
        'Entrants consent to the Promoter using the personal information provided in connection with this promotion for the purposes of facilitating the conduct of the promotion and awarding any prizes, including to third parties involved in the promotion and any relevant authorities. In addition to any use that may be  outlined in the Promoter’s Privacy Policy, the Promoter including third parties may, for an indefinite period, unless otherwise advised, use the private information for promotional,  marketing, publicity, research and profiling purposes, including sending electronic messages or telephoning the entrant.',
    },
    {
      listItem:
        "The collection and disclosure of personal information provided in connection with this promotion will be handled in accordance with the Promoter's Privacy statement which adheres to the Privacy Act 1988 (cth) and Australian Privacy Principles.",
    },
    {
      listItem:
        'The Promotion and these Terms of entry will be governed by the law of the State or Territory in which the Promoter ordinarily resides. Entrants accept the non-exclusive jurisdiction of courts and tribunals of that State or Territory in connection with disputes concerning the Promotion.',
    },
    {
      listItem:
        'Facebook, YouTube, Instagram, TikTok, or Snapchat may be used to advertise or promote the Promotion. By entering the Promotion,  entrants agree that the Promotion is in no way sponsored, endorsed or administered by, or associated with Facebook,  YouTube, Instagram, TikTok or Snapchat; and to release Facebook, YouTube, Instagram, TikTok, or Snapchat from all liability in  relation to this Promotion. Any questions, comments or complaints regarding the Promotion should be directed to the Promoter and not Facebook, YouTube, Instagram, TikTok, or Snapchat.',
    },
  ];
  return (
    <Box className={Classes.MoonMaidTermsConditionPageWrapper}>
      <Header />
      <Box className={Classes.titleWrapper}>
        <Container>
          <Typography className={Classes.title} component="h3">
            Moon Maid Terms and Conditions
          </Typography>
        </Container>
      </Box>
      <Box className={Classes.descriptionWrapper}>
        <Container className={Classes.pointsContainer}>
          <Box className={Classes.scheduleSection}>
            <Typography component="h2" className={Classes.sectionTitle}>
              Schedule to Terms & Conditions of entry
            </Typography>
            {scheduleRowData.map((row, index) => (
              <Typography
                key={index}
                component="div"
                className={Classes.scheduleRow}
              >
                <Typography component="div" className={Classes.rowTitle}>
                  {row.title}
                </Typography>
                <Typography className={Classes.rowDescription}>
                  {row.description}
                </Typography>
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography component="h2" className={Classes.sectionTitle}>
              Terms & Conditions of entry
            </Typography>
            <ol className={Classes.termsPoints}>
              {termsData.map((item, index) => (
                <li key={index}>{item.listItem}</li>
              ))}
            </ol>
          </Box>
        </Container>
      </Box>
      <Partners />
      <Footer />
    </Box>
  );
};

export default MoonMaidTermsCondition;
