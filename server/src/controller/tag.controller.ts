import chalk from "chalk";
import { Request, Response } from "express";
import HttpStatus from 'http-status-codes';
import { CustomRequest } from "../middleware/auth";
import MTags, { TTags } from "../model/Tags";

export async function createTag(req: CustomRequest, res: Response) {
    console.log(chalk.magentaBright("inside create Tag:"), req.body as TTags);
    if (req.user) {
        const tagData = {
            user: req.user._id,
            tag: req.body.tag,
          };
        //const tag = req.body as TTags;
        const newTag = new MTags(tagData);
        await newTag.save();
        console.log(chalk.greenBright("Tag created success.."));
        res.status(HttpStatus.CREATED).send();
    } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'user is not present please relogin.' });
    }

}

export async function findAllTags(req: Request, res: Response) {
    try {
        const tags = await MTags.find({}); // Find all tags without populating
        res.send(tags);
      } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error fetching tags');
      }
};
