// Nathaniel Low P2323428 DIT/FT/1B/05

const pool = require("../services/db.js");

const bcrypt = require("bcrypt");
const saltRounds = 10;

bcrypt.hash('dev', saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password", error) 
    } else {
        console.log("hashed password:", hash);

        const SQLSTATEMENT = `
        DROP TABLE IF EXISTS Messages;
        DROP TABLE IF EXISTS QuestProgress;
        DROP TABLE IF EXISTS TaskProgress;
        DROP TABLE IF EXISTS UserInventory;
        DROP TABLE IF EXISTS UserServants;
        DROP TABLE IF EXISTS User;
        DROP TABLE IF EXISTS Task;
        DROP TABLE IF EXISTS Quest;
        DROP TABLE IF EXISTS Servants;
        DROP TABLE IF EXISTS Bosses;
    
        CREATE TABLE Messages (
            id INT PRIMARY KEY AUTO_INCREMENT,
            message_text TEXT NOT NULL,
            user_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
    
        CREATE TABLE User (
            user_id INT PRIMARY KEY AUTO_INCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    
        CREATE TABLE Quest (
            quest_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title text,
            requirements text,
            saint_quartz int DEFAULT 3
        );
    
        CREATE TABLE QuestProgress ( 
            progress_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id int NOT NULL,
            quest_id int NOT NULL,
            completion_date timestamp NULL DEFAULT NULL,
            requirements text,
            KEY questprogress_user_id_user_user_idx (user_id),  
            KEY questprogress_quest_id_quest_quest_idx (quest_id),  
            CONSTRAINT questprogress_quest_id_quest FOREIGN KEY (quest_id) REFERENCES Quest (quest_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT questprogress_user_id_user FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
    
        CREATE TABLE UserServants (
            user_servant_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id int NOT NULL,
            username text,
            servant_id int NOT NULL,
            img_id int NOT NULL,
            servant_name text,
            atk int NOT NULL,
            hp int NOT NULL,
            class text,
            KEY UserServants_user_id_user_user_id_idx (user_id),
            CONSTRAINT UserServants_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
    
        CREATE TABLE Servants (
            servant_id int NOT NULL PRIMARY KEY,
            img_id int NOT NULL,
            servant_name text,
            class text,
            atk int NOT NULL,
            hp int NOT NULL
        );
    
        CREATE TABLE Bosses (
            boss_id int NOT NULL PRIMARY KEY,
            img_id int NOT NULL,
            name text,
            class text,
            drop_name text,
            atk int NOT NULL,
            hp int NOT NULL
        );      
    
        CREATE TABLE UserInventory (
            user_id int NOT NULL PRIMARY KEY,
            username text,
            saber_gem int DEFAULT 0,
            lancer_gem int DEFAULT 0,
            archer_gem int DEFAULT 0,
            caster_gem int DEFAULT 0,
            rider_gem int DEFAULT 0,
            assassin_gem int DEFAULT 0,
            berserker_gem int DEFAULT 0,
            ruler_gem int DEFAULT 0,
            avenger_gem int DEFAULT 0,
            moon_gem int DEFAULT 0,
            saint_quartz int DEFAULT 0,
            KEY UserInventory_user_id_user_user_id_idx (user_id),
            CONSTRAINT UserInventory_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
    
        INSERT INTO Messages (message_text, user_id) VALUES
        ("Hello world!", 1),
        ("Yummy!", 2),  
        ("I am the one", 3)
        ;

        INSERT INTO User (user_id, username, email, password) VALUES
            (1,'Annie How','anniehow@amail.com','${hash}'),
            (2,'Bo Shieh','bohshieh@bmail.com','${hash}'),
            (3,'Carrie Ong','carrieong@cmail.com','${hash}'),
            (4,'Dabu Liao','dabuliao@dmail.com','${hash}'),
            (5,'Ellie Fan','elliefan@email.com','${hash}'),
            (6,'Dev','Development@a.com','${hash}')
        ;
    
        INSERT INTO UserInventory (user_id, username, Avenger_gem, Ruler_gem, saint_quartz) VALUES
            (1,'Annie How',0,0,10),
            (2,'Bo Shieh',0,0,10),
            (3,'Carrie Ong',0,0,10),
            (4,'Dabu Liao',0,0,10),
            (5,'Ellie Fan',0,0,10),
            (6,'Dev',1,1,100)
        ;
    
        INSERT INTO UserServants (user_id, username, servant_id, img_id, servant_name, atk, hp, class) VALUES
            (1,'Annie How',0,800100,'Mash',9,14,'Shielder'),
            (2,'Bo Shieh',0,800100,'Mash',9,14,'Shielder'),
            (3,'Carrie Ong',0,800100,'Mash',9,14,'Shielder'),
            (4,'Dabu Liao',0,800100,'Mash',9,14,'Shielder'),
            (5,'Ellie Fan',0,800100,'Mash',9,14,'Shielder'),
            (6,'Dev',9,901800,'Uesugi Kenshin',11,13,'Ruler')
        ;
    
        INSERT INTO Quest VALUES 
            (1,'Defeat Qin Shi Huang','ruler_gem',5),
            (2,'Defeat Oda Nobunaga','avenger_gem',5),
            (3,'Defeat Medusa','rider_gem',3),
            (4,'Defeat Karna','lancer_gem',3),
            (5,'Defeat Gawain','saber_gem',3),
            (6,'Defeat Gilgamesh','archer_gem',3)
        ;
    
        INSERT INTO QuestProgress VALUES 
            (1,2,2,'2023-11-14 16:00:00','avenger_gem'),
            (2,6,2,'2023-11-14 16:00:00','avenger_gem')
        ;
    
        INSERT INTO Servants VALUES 
            (0,800100,'Mash','Shielder',9,14),
            (1,100100,'Altria Pendragon','Saber',11,15),
            (2,304700,'Percival','Lancer',9,12),
            (3,204300,'Baobhan Sith','Archer',10,13),
            (4,704000,'Morgan','Berserker',12,12),
            (5,105000,'Barghest','Saber',9,14),
            (6,500300,'Tamamo no Mae','Caster',10,14),
            (7,601800,'Mysterious Heroine X','Assassin',11,12),
            (8,404200,'Habetrot','Rider',8,11),
            (9,901800,'Uesugi Kenshin','Ruler',11,13),
            (10,1101500,'Nitocris (Alter)','Avenger',12,12),
            (11,2300500,'Archetype Earth','Moon_Cancer',11,14),
            (12,1001600,'Tiamat','Alter_Ego',11,14)
        ;
    
        INSERT INTO Bosses VALUES 
            (1,100700,'Gawain','Saber','saber_gem',14,16),
            (2,300400,'Karna','Lancer','lancer_gem',15,17),
            (3,200200,'Gilgamesh','Archer','archer_gem',15,16),
            (4,500800,'Merlin','Caster','caster_gem',13,18),
            (5,400100,'Medusa','Rider','rider_gem',11,14),
            (6,602500,'First Hassan','Assassin','assassin_gem',11,13),
            (7,700100,'Heracles','Berserker','berserker_gem',17,18),
            (8,603700,'Kama','Beast','saint_quartz',15,15),
            (9,900600,'Qin Shi Huang','Ruler','ruler_gem',10,16),
            (10,1100700,'Oda Nobunaga','Avenger','avenger_gem',12,16),
            (11,2300100,'BB','Moon_Cancer','moon_gem',8,13),
            (12,1000900,'King Protea','Alter_Ego','saint_quartz',12,13)
        ;
    `;
        pool.query(SQLSTATEMENT,(error,results,fields) => {
            if (error) {
                console.error("Error creating tables: ", error);
            } else {
                console.log("Tables created successfully", results);
            }
            process.exit();
        });    
    }
})




