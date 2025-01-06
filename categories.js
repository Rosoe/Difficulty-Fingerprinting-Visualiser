const categories = {
    Performance: {
        color: 'rgb(24,144,255)',
        description: 'Performance encompasses skills where immediate physical or neurological capability is the primary constraint on success. These are typically fast, unconscious, and direct actions with clear feedback loops and high certainty of outcomes.',
        subcategories: {
            'Input Precision': ['Pressing the right buttons, in the right order, at the right time, consistently.', 'Executing a perfect wavedash in Super Smash Bros Melee, fighting game combos, or stomping in directions on an arcade DDR machine.'],
            'Motor Control': ['Tracking target objects and manipulating them successfully. Typical where the controls are not complex but where control is.', 'Maintaining aim on and shooting a moving target in CS:GO; threading Mario through multiple platforming objects; or keeping your car on a racing line in Gran Turismo.'],
            'Mathematical Processing': ['Quickly determining the best course of action by calculating numerical advantages and disadvantages in real-time, such as damage values, resource costs, or risk/reward ratios.', 'Calculating the damage advantages of one card versus another in The Bazaar; determining optimal resource allocation in real-time strategy games.'],
            'Visual and Spatial Processing': ['Tracking objects on the screen and determining basic collision paths and movement patterns.', 'Avoiding hundreds of individual objects in Enter the Gungeon; Reading attack animations in Elden Ring to time dodges.'],
            'Reaction Processing': ['Responding quickly and accurately to game events', 'Pure response time, such as blocking throws in Tekken 8 on reaction.'],
            'Physical Fatigue' : ['Overcoming the physiological stress that a video game places on a player.','Resisting the urge to blink in Before Your Eyes; maintaining high actions per minute on an arcade Dance Dance Revolution cabinet; Staying awake through sleep fatigue for the Absolute Virtue fight in Final Fantasy XI.']
        }
    },
    Execution: {
        color: 'rgb(82,196,26)',
        description: 'Execution involves active mental processing and tactical decision-making in real-time situations. It represents the bridge between comprehension and performance, focusing on adaptation and strategic application under pressure. Execution deals with mixed levels of certainty - outcomes are influenced by changing conditions but feedback loops remain relatively short.',
        subcategories: {
            'Tactical Adaptation': ['Changing behaviour after after identifying new information', 'Changing build order in StarCraft after scouting an enemy rush build.'],
            'Resource Management': ['Keeping track of available options, often limited or one time use, and meting out their use to best effect', 'Effectively utilising limited items during long boss fight sessions in Elden Ring.'],
            'Pattern Recognition:': ['Identifying repetitive behaviour that can be exploited in the short term.', 'Recognising opponent habits in fighting games; identifying attack strings/behaviour changes in a Souls game.'],
            'Attention Management:': ['Attending to multiple high priority, time limited, important responsibilities in the moment.', 'Multi-tasking attention across healing, shielding, buffs, enfeebles, damage, and communication as a healing class in FFXIV.'],
            'Pattern Recognition & Response': ['Identifying and countering opponent patterns', 'Recognising opponent habits in fighting games; identifying attack strings/behaviour changes in a Souls game.'],
            'Time/Attention Management': ['Balancing multiple gameplay aspects simultaneously', 'Multi-tasking attention across healing, shielding, buffs, enfeebles, damage, and communication as a healing class in FFXIV; evaluating which of 5+ enemy types to focus on in a group encounter in Dark Souls; or which line to defend when being overtaken on both sides in Forza Horizon 5.']
        }
    },
    Comprehension: {
        color: 'rgb(250,173,20)',
        description: 'Comprehension involves understanding game systems, patterns, and principles. It encompasses both basic mechanical understanding and complex strategic patterns that have become internalised knowledge. While comprehension can include sophisticated concepts, its core feature is that it\'s about understanding what is happening rather than making decisions about how to use that understanding. Generally, comprehension is about knowing and using provided and intuitable information then synthesising additional understanding from this.',
        subcategories: {
            'System Memorisation': ['Retaining fundamental or easily understandable knowledge of a game: such as rules, weapon options, chess openings, moves, negative status effects.', 'Memorisation of all 1,025 pokemon and critical info, all 934 moves/attacks, all 171 pokemon type interactions...'],
            'Knowledge Management': ['Creation and maintenance of a knowledge management system when memory isn\'t enough.', 'Writing out puzzle notes for Tunic\'s endgame or keeping a PKM for card interactions in Book of Hours.'],
            'Systems Understanding': ['How difficult is it to use the basic information of the game to get successful results? In chess, the basic information is simple but is difficult to understand, requiring a long educational journey for its players that really does stress their intelligence. Whereas In Breath of the Wild has a large number of items and systems but their functions are intuitive.', 'Understanding the different symbol meanings in The Witness\' puzzles.'],
            'Complex System Interactions': ['How complex are the interactions between a game\'s systems and how predictable are the outcomes of these interactions.', 'Understanding whether a Pokemon attack will be a single hit KO when it is a STAB water attack against Grass/Fire dual-type with the Rain weather effect in play.']
        }
    },
    Strategy: {
        color: 'rgb(245,34,45)',
        description: 'Strategy operates at a high level of abstraction, dealing with decisions about how to approach the game itself. It can involve planning, genuine strategy creation, the high-level application of game knowledge for long-term benefit, and the synthesis of different game knowledge networks for unique ideas - as opposed to comprehension where we consider more immediate implications of game knowledge and systems interactions. It covers the creation of goals, structures, control and feedback systems to improve a player\'s results within a game. It handles long feedback loops and higher levels of uncertainty.',
        subcategories: {
            'Risk and Opportunity Assessment': ['Identifying opportunities and problems that need significant investment to overcome or leverage.', 'Identifying a meta trend for stalling teams in Pokemon, which are a weakness a low damage team.'],
            'Strategic Decision Making': ['Balancing all decision making factors to come to the best conclusion.', 'Deciding which Pokemon team and setups to use in a tournament.'],
            'Planning and Goal Setting': ['Planning work and keeping track of goals so you can complete them consistently.', 'Prioritising the development of specific Pokemon that critical to your new team composition.'],
            'Time Management': ['Keeping to an effective schedule to achieve the results you had planned.', 'Scheduling in 2-hours of uninterruptible time to develop new Pokemon before a tournament deadline.']
        }
    },
    Research: {
        color: 'rgb(114,46,209)',
        description: 'Learning and Research involves systematic approaches to understanding game systems when game-provided knowledge, natural intuition, and experience-based learning prove insufficient - or even when a game choses not to present data that a player deems critical. Knowledge gained through Learning and Research can eventually be simplified into heuristics and patterns that work within the Comprehension-Execution axis, but the original research process requires dedicated systematic approach beyond normal play. It operates at a higher level of abstraction than Strategy, dealing with the creation and validation of new knowledge through systemic investigation.',
        subcategories: {
            'Novel Theory/Hypothesis Development': ['Using current knowledge to identify gaps and opportunities where gain new knowledge is essential or interesting.', 'Brainstorming new redstone mechanisms in Minecraft; theorising potential solution ideas for puzzles in Tunic; hypothesising about growth mechanics in Final Fantasy XI\'s gardening system.'],
            'Systematic Testing, Recording, and Data Validation': [' Identifying what data is needed to prove a particular fact or idea and creating methods to obtain that data and record it.', 'Recording exact frame data for moves in Guilty Gear -Strive-'],
            'Research Tool Development': ['Producing tools that overcome data collection barriers in game, such as parsers', 'Creating DPS parsing tools to aid FFXIV damage rotation optimisation projects.'],
            'Data Analysis': ['Reviewing findings for key insights and other paths of research to meet key in-game goals.', 'Analysing DPS logs in FFXIV to identify optimal rotation timings; reviewing match replay data in League of Legends to identify winning patterns.'],
            'Documentation Methods': ['Producing documentation and content so other players can benefit from learned knowledge. Could be for just your friends, your guild, or the community as a whole.', 'Creating and maintaining wiki pages for complex crafting systems in MMOs; documenting frame data and combo routes for fighting games; writing detailed guides for raid encounters.']
        }
    },
    'Meta & External': {
        color: 'rgb(99,89,236)',
        description: 'Knowledge and resources external to the game that can influence performance within a game. This includes understanding the meta strategies of a game that are not presented formally within the game; external human knowledge that proves useful when playing a game; or external resources that can be leveraged for an advantage within the game, such as money. Often most relevant in live service and competitive games.',
        subcategories: {
            'External Knowledge': ['Covers every piece of real world knowledge that might be helpful in a game. Definition is necessarily broad for the purpose of this system.', 'Knowing a lot about American Pop Culture when playing Jackbox quiz games; speaking Japanese in a multi-region MMORPG server; knowing how to code custom mods for your World-First WoW guild\'s personal use.'],
            'External Resources': ['If money can act as a substitute for progression in a game then having that available to a player is a legitimate source of difficulty that can be overcome variably by different players. The whole concept of pay to win games is predicated on this notion.', 'Buying gold in an MMORPG so you can transfer time spent on economy to MSQ progression; buying inventory space items in Path of Exile.'],
            'Meta-game Knowledge': ['Having access and interest in the meta strategies, developments, and predictions that are not a part of the game but can or will affect play in game.', 'Predicting PvP relevant changes in World of Warcraft (so one can prepare characters in advance for a Day 1 advantage.); predicting developer intentions around item nerfs (so you can buy/sell bull/bear markets for profit.); racking the win rates of different characters in Super Smash Bros (to aid selection of competitive main characters to learn.)']
        }
    },
    Emotional: {
        color: 'rgb(245,86,124)',
        description: 'Emotional Management encompasses the skills and capabilities related to understanding, controlling, and effectively channelling emotions during gameplay. It involves both immediate emotional regulation and longer-term emotional resilience, affecting how players handle challenges, process outcomes, and maintain effective engagement with games.',
        subcategories: {
            'Composure': ['Maintain high performance levels despite the tension of completing a difficult task for high stakes.', 'Keeping to your strategy when a boss is on one hit, rather than making a risky hit in Elden Ring; closing out a 1 v 3 win in competitive CounterStrike 2.'],
            'Patience and Resilience': ['Being able to wait a long time or endure many difficulties before experiencing tangible benefits.', 'Persevering with obtuse puzzles with little to no feedback in Tunic\'s end game; saving relic weapon currency for 12-24 months in Golden Age Final Fantasy XI; long periods with zero progression in skills or results in competitive shooters.'],
            'Tilt, Rage, and Frustration Control': ['Neutralising or utilising angry and frustrated emotions to maintain performance after losses and failures.', 'Dropping a combo and leaving your opponent on 1hp in Tekken 8; Getting 3-stocked in competitive Super Smash Bros and winning the next set.']
        }
    },
    Social: {
        color: 'rgb(250,84,28)',
        description: 'Social Difficulty encompasses skills related to navigating multiplayer social structures, managing relationships, and coordinating group efforts. It involves understanding social hierarchies, building and maintaining connections, and effectively collaborating with others to achieve shared goals.',
        subcategories: {
            'Leadership': ['Taking charge of social groups and progressing with purpose.', 'Leading an experience point party in Final Fantasy XI; running a raiding guild in World of Warcraft; Organising a scratch PvP group in Valorant.'],
            'Coordination and Teamwork': ['Adjusting your actions in relation to others.', 'Adjusting your hero shooter play style to accommodate and compliment team mates in Overwatch; Levelling a support job in an MMO because they are more in demand for experience and end game; defending a lane conservatively when you trust your team is going to support you shortly; helping a friend with MSQ progression in an MMO.'],
            'Mentoring and Teaching': ['Teaching and helping others learn how to do something or become a a better version of themselves.', 'Teaching a player how to manage distances in League of Legends to avoid being farmed for XP; showing a guild member how to complete raid pre-requisites so they are prepared and easier to work with later.'],
            'Negotiation and Conflict': ['Having discussions aimed at finding agreements and ways to progress forward when there are issues.', 'Reaching a compromise with your party over who should cast lots for a desirable item, such as agreeing to give you a more valuable item later; agreeing to sell crafting materials under market value in exchange for help developing your own crafting skills in an MMO.'],
            'Persuasion and Deal Making': ['Having discussions where the aim is to persuade someone to accept or work with your beliefs or to close deals on terms beneficial to you.', 'Making beneficial trade deals with asymmetric information in Civilisation V; convincing a team member to switch characters for a more balanced team composition in Deadlock; convincing a guild leader to ignore DKP because there are significant strategic reasons you should obtain a valuable item.'],
            'Politics and Hierarchies': ['Understanding and navigating formal and informal power structures within gaming communities.', 'Managing relationships between different raid teams in an MMO guild; navigating tournament organiser relationships in competitive gaming; understanding and working within the hierarchy of a large gaming clan.']
        }
    }
};
